import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsSubNavbarComponent } from './sms-sub-navbar.component';

describe('SmsSubNavbarComponent', () => {
  let component: SmsSubNavbarComponent;
  let fixture: ComponentFixture<SmsSubNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsSubNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsSubNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
