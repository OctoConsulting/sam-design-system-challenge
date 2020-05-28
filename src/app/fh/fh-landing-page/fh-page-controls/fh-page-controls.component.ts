import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-fh-page-controls',
  templateUrl: './fh-page-controls.component.html',
  styleUrls: ['./fh-page-controls.component.scss']
})
export class FhPageControlsComponent implements OnInit {
  @Input() resultList = {};

  @Input() page = {
    pageNumber: 1,
    pageSize: 25,
    totalPages: 10
  };

  @Output() pageChange = new EventEmitter<any>();

  @Output() sortChange = new EventEmitter<any>();

  public top = { id: 'top' };

  public sortFieldFormControl = new FormGroup({});
  public sortField: FormlyFieldConfig[] = [
    {
      key: 'sortBy',
      type: 'select',
      defaultValue: 'name',
      templateOptions: {
        label: 'Sort By',
        required: true,
        options: [
          { label: 'Name', value: 'name' },
          { label: 'Organization ID', value: 'orgid' }
        ]
      }
    }
  ];

  constructor() { }

  ngOnInit() {
    this.initSortFieldFormOnChange();
  }

  onPageChange(event: any) {
    this.pageChange.emit(event);
  }

  private initSortFieldFormOnChange(): void {
    this.sortFieldFormControl.valueChanges.subscribe(newValue => this.sortChange.emit(newValue));
  }
}
