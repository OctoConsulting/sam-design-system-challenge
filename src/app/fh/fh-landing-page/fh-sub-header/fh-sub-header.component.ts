import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fh-sub-header',
  templateUrl: './fh-sub-header.component.html',
  styleUrls: ['./fh-sub-header.component.scss']
})
export class FhSubHeaderComponent implements OnInit {

  model = {}

  searchSettings = {
    placeholder: 'Enter Organization name here'
  };

  @Output()
  searchEvent = new EventEmitter<any>();

  // Toggle this to display create department button
  isSuperAdmin = false;

  constructor() { }

  ngOnInit() {
  }

  onSearch($event: {searchText: string}) {
    const queryParams = {
      fhorgname: $event.searchText
    };

    this.searchEvent.emit(queryParams);
  }
}
