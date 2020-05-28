import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhSubHeaderComponent } from './fh-sub-header.component';

describe('FhSubHeaderComponent', () => {
  let component: FhSubHeaderComponent;
  let fixture: ComponentFixture<FhSubHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhSubHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
