import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OscarAdminComponent } from './oscar-admin.component';

describe('OscarAdminComponent', () => {
  let component: OscarAdminComponent;
  let fixture: ComponentFixture<OscarAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OscarAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OscarAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
