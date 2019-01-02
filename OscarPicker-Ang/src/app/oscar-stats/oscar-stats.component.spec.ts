import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OscarStatsComponent } from './oscar-stats.component';

describe('OscarStatsComponent', () => {
  let component: OscarStatsComponent;
  let fixture: ComponentFixture<OscarStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OscarStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OscarStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
