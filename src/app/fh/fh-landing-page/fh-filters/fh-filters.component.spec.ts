import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhFiltersComponent } from './fh-filters.component';

describe('FhFiltersComponent', () => {
  let component: FhFiltersComponent;
  let fixture: ComponentFixture<FhFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
