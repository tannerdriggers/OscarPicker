import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OscarFormComponent } from './oscar-form.component';

describe('OscarFormComponent', () => {
  let component: OscarFormComponent;
  let fixture: ComponentFixture<OscarFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OscarFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OscarFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
