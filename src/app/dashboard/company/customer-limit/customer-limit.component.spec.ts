import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLimitComponent } from './customer-limit.component';

describe('CustomerLimitComponent', () => {
  let component: CustomerLimitComponent;
  let fixture: ComponentFixture<CustomerLimitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLimitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
