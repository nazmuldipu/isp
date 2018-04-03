import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuySmsComponent } from './buy-sms.component';

describe('BuySmsComponent', () => {
  let component: BuySmsComponent;
  let fixture: ComponentFixture<BuySmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuySmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuySmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
