import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhNavHeaderComponent } from './fh-nav-header.component';

describe('FhNavHeaderComponent', () => {
  let component: FhNavHeaderComponent;
  let fixture: ComponentFixture<FhNavHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhNavHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhNavHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
