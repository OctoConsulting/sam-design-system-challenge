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
      key: 'level',
      type: 'multicheckbox',
      templateOptions: {
        label: 'Level', // Bug: label doesn't work. Must use description instead, which is tiny text
        description: 'Level',
        required: true,
        options: [
          {
            key: 1,
            value: 'Department'
          },
          {
            key: 2,
            value: 'Sub-Tier'
          },
          {
            key: 3,
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
    console.log('filterChange', newValue);
    let level = [];
    if (newValue.level) {
      if (newValue.level[1]) {
        level.push(1);
      }
      if (newValue.level[2]) {
        level.push(2);
      }
      if (newValue.level[3]) {
        level.push(3);
      }
    }
    const queryParams = {
      level
    };

    this.filterChange.emit(queryParams);
  }
}
