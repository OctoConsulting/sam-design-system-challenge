import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fh-nav-header',
  templateUrl: './fh-nav-header.component.html',
  styleUrls: ['./fh-nav-header.component.scss']
})
export class FhNavHeaderComponent implements OnInit {

  @Input() userOrg: any;

  @Output() editClicked = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onEdit() {
    this.editClicked.emit(this.userOrg);
  }

}
