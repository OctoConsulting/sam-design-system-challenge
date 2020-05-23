import { Component, OnInit } from '@angular/core';
import { LocationStrategy } from '@angular/common';
import { AppService } from '../../app-service/app.service';

@Component({
  selector: 'sam-header',
  templateUrl: './sam-header.component.html',
  styleUrls: ['./sam-header.component.scss']
})
export class SamHeaderComponent implements OnInit {

  constructor(public model: AppService, public locationStrategy: LocationStrategy) { }

  ngOnInit() {
  }

}
