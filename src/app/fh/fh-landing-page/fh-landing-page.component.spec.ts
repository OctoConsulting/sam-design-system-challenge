import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FhLandingPageComponent } from './fh-landing-page.component';

describe('FhLandingPageComponent', () => {
  let component: FhLandingPageComponent;
  let fixture: ComponentFixture<FhLandingPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FhLandingPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FhLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
