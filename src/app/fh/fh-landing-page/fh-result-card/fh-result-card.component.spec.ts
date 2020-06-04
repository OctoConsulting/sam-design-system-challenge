import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhResultCardComponent } from './fh-result-card.component';

describe('FhResultCardComponent', () => {
  let component: FhResultCardComponent;
  let fixture: ComponentFixture<FhResultCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhResultCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhResultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
