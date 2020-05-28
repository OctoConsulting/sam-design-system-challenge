import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fh-filters',
  templateUrl: './fh-filters.component.html'
})
export class FhFiltersComponent implements OnInit {

  @Output()
  filterChange = new EventEmitter<any>();

  form = new FormGroup({});
  model: any = {};

  // Input
  sdsInput: FormlyFieldConfig[];

  constructor(
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeParams = this.activatedRoute.snapshot.queryParams;
    console.log(routeParams['fhorgtype']);
    this.initializeFilterForm(routeParams);
  }

  onFilterChange(newValue) {
    let queryParams = {};
    if (newValue.type) {
      queryParams['fhorgtype'] = Object.keys(newValue.type).filter(key => newValue.type[key] && newValue.type[key] === true);
    }

    if (newValue.createdAfter) {
      queryParams['createddatefrom'] = new Date(newValue.createdAfter).toISOString().split('T')[0];
    }

    if (newValue.keyword) {
      queryParams['keyword'] = newValue.keyword;
    }

    this.filterChange.emit(queryParams);
  }

  private initializeFilterForm(routeParams) {
    this.sdsInput = [
      {
        key: 'keyword',
        type: 'input',
        defaultValue: routeParams['keyword'] ? routeParams['keyword'] : undefined,
        templateOptions: {
          label: 'Keyword',
          required: true
        }
      },
      {
        key: 'createdAfter',
        type: 'datepicker',
        defaultValue: routeParams['createddatefrom'] ? new Date(routeParams['createddatefrom']) : undefined,
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
        defaultValue: {
          'Department/Ind. Agency': routeParams['fhorgtype'].indexOf('Department/Ind. Agency') > -1 ? true : false,
          'Sub-Tier': routeParams['fhorgtype'].indexOf('Sub-Tier') > -1 ? true : false,
          'Office': routeParams['fhorgtype'].indexOf('Office') > -1 ? true : false,
        },
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
          const show = model && model.type && model.type['Sub-Tier'];
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
          const show = model && model.type && model.type['Office'];
          return !show;
        },
      },
    ];
  }
}
