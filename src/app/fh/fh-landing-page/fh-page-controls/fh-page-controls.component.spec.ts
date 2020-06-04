import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhPageControlsComponent } from './fh-page-controls.component';

describe('FhPageControlsComponent', () => {
  let component: FhPageControlsComponent;
  let fixture: ComponentFixture<FhPageControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhPageControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhPageControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
