import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FHSort } from '../../interface/fh-sort';

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

  @Output() sortChange = new EventEmitter<FHSort>();

  public top = { id: 'top' };

  public sortFieldFormControl = new FormGroup({});
  public sortField: FormlyFieldConfig[] = [
    {
      key: 'sortBy',
      type: 'select',
      defaultValue: FHSort.NAME,
      templateOptions: {
        label: 'Sort By',
        required: true,
        options: [
          { label: 'Name', value: FHSort.NAME },
          { label: 'Start Date', value: FHSort.START_DATE}
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
    this.sortFieldFormControl.valueChanges.subscribe(newValue => this.sortChange.emit(newValue.sortBy));
  }
}
