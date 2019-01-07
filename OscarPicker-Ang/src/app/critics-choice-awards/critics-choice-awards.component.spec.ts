import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriticsChoiceAwardsComponent } from './critics-choice-awards.component';

describe('CriticsChoiceAwardsComponent', () => {
  let component: CriticsChoiceAwardsComponent;
  let fixture: ComponentFixture<CriticsChoiceAwardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriticsChoiceAwardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriticsChoiceAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
