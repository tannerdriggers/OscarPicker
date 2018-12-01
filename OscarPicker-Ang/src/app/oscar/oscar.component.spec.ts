import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OscarComponent } from './oscar.component';

describe('OscarComponent', () => {
  let component: OscarComponent;
  let fixture: ComponentFixture<OscarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OscarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OscarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
