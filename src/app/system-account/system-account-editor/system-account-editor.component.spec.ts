import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAccountEditorComponent } from './system-account-editor.component';

describe('SystemAccountEditorComponent', () => {
  let component: SystemAccountEditorComponent;
  let fixture: ComponentFixture<SystemAccountEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAccountEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAccountEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
