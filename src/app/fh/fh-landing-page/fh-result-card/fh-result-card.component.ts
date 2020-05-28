import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-fh-result-card',
  templateUrl: './fh-result-card.component.html',
  styleUrls: ['./fh-result-card.component.scss']
})
export class FhResultCardComponent implements OnInit {
  @Input() org = {};
  @Output() editOrg = new EventEmitter<any>();


  public actionMenuModel = {
    trigger: {
      type: 'plain', // plain | primary
      shadow: true
    },
    actions: [
      { id: 'edit', text: 'Edit' },
    ]
  };

  constructor() { }

  ngOnInit() {
  }

  public onActionMenuClick(event: any): void {
    console.log(event);
    this.editOrg.emit(event);
  }

}
