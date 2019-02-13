import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebViewComponent } from './web-view.component';

describe('WebViewComponent', () => {
  let component: WebViewComponent;
  let fixture: ComponentFixture<WebViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
