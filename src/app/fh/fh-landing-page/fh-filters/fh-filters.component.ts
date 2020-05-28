import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-fh-filters',
  templateUrl: './fh-filters.component.html'
})
export class FhFiltersComponent {

  @Output()
  filterChange = new EventEmitter<any>();

  form = new FormGroup({});
  model: any = {};

  // Input
  sdsInput: FormlyFieldConfig[] = [
    {
      key: 'keyword',
      type: 'input',
      templateOptions: {
        label: 'Keyword',
        required: true
      }
    },
    {
      key: 'createdAfter',
      type: 'datepicker',
      templateOptions: {
        required: true,
        label: 'Created After',
        minDate: new Date(2019, 12, 31),
        maxDate: new Date(2030, 1, 1)
      }
    },
    {
      key: 'type',
      type: 'multicheckbox',
      wrappers: ['accordionwrapper'],
      templateOptions: {
        label: 'Org Type', // Bug: label doesn't work. Must use description instead, which is tiny text
        required: true,
        options: [
          {
            key: 'Department/Ind. Agency',
            value: 'Department'
          },
          {
            key: 'Sub-Tier',
            value: 'Sub-Tier'
          },
          {
            key: 'Office',
            value: 'Office'
          }
        ]
      }
    },
    {
      key: 'agencyCode',
      type: 'input',
      templateOptions: {
        label: 'Agency Code',
        required: true
      },
      hideExpression: (model, formState) => {
        const show = model && model.level && model.level[2];
        return !show;
      },
    },
    {
      key: 'aacCode',
      type: 'input',
      templateOptions: {
        label: 'AAC Code',
        required: true
      },
      hideExpression: (model, formState) => {
        const show = model && model.level && model.level[3];
        return !show;
      },
    },
  ];

  onFilterChange(newValue) {
    let selectedOrgTypes = [];
    if (newValue.type) {
      selectedOrgTypes = Object.keys(newValue.type).filter(key => newValue.type[key] && newValue.type[key] === true);
    }

    console.log(newValue, selectedOrgTypes);
    const queryParams = {
      fhorgtype: selectedOrgTypes
    };

    this.filterChange.emit(queryParams);
  }
}
