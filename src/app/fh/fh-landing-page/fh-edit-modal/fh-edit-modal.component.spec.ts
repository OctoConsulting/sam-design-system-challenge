import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhEditModalComponent } from './fh-edit-modal.component';

describe('FhEditModalComponent', () => {
  let component: FhEditModalComponent;
  let fixture: ComponentFixture<FhEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
