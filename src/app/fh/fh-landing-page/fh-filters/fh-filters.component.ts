import { Component, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-fh-filters',
  templateUrl: './fh-filters.component.html'
})
export class FhFiltersComponent implements OnInit, OnChanges {

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
    const initialParams = this.activatedRoute.snapshot.queryParams;
    this.initializeFilterForm(initialParams);

    // Watch for changes to general search
    this.activatedRoute.queryParams.subscribe(params => {
      this.model['keyword'] = params['fhorgname'];
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.keyword) {
      console.log(Object.keys(this.form.controls));
    }
  }

  onFilterChange(newValue) {
    let queryParams = {};
    if (newValue.type) {
      queryParams['fhorgtype'] = newValue.type
    }

    if (newValue.createdAfter) {
      queryParams['createddatefrom'] = new Date(newValue.createdAfter).toISOString().split('T')[0];
    }

    if (newValue.keyword) {
      queryParams['fhorgname'] = newValue.keyword;
    }

    queryParams = {
      ...queryParams,
      agencycode:  newValue.type === 'Sub-Tier' ? newValue.agencyCode : undefined,
      aacofficecode: newValue.type === 'Office' ? newValue.aacCode : undefined,
    };

    this.filterChange.emit(queryParams);
  }

  private initializeFilterForm(routeParams) {
    this.sdsInput = [
      {
        key: 'keyword',
        type: 'input',
        defaultValue: routeParams['fhorgname'] ? routeParams['fhorgname'] : undefined,
        templateOptions: {
          hideOptional: true,
          label: 'Keyword',
        }
      },
      {
        key: 'createdAfter',
        type: 'datepicker',
        defaultValue: routeParams['createddatefrom'] ? new Date(routeParams['createddatefrom']) : undefined,
        templateOptions: {
          hideOptional: true,
          label: 'Created After',
          minDate: new Date(1940, 12, 31),
          maxDate: new Date()
        }
      },
      {
        key: 'type',
        type: 'radio',
        wrappers: ['accordionwrapper'],
        defaultValue: routeParams['fhorgtype'] ? routeParams['fhorgtype'] : undefined,
        templateOptions: {
          label: 'Org Type', // Bug: label doesn't work. Must use description instead, which is tiny text
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
        defaultValue: routeParams['agencycode']? routeParams['agencycode'] : undefined,
        templateOptions: {
          hideOptional: true,
          label: 'Agency Code',
        },
        hideExpression: (model, formState) => {
          const show = model && model.type && model.type === 'Sub-Tier';
          return !show;
        },
      },
      {
        key: 'aacCode',
        type: 'input',
        defaultValue: routeParams['aacofficecode']? routeParams['aacofficecode'] : undefined,
        templateOptions: {
          hideOptional: true,
          label: 'AAC Code',
        },
        hideExpression: (model, formState) => {
          const show = model && model.type && model.type === 'Office';
          return !show;
        },
      },
    ];
  }
}
