import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSubNavbarComponent } from './customer-sub-navbar.component';

describe('CustomerSubNavbarComponent', () => {
  let component: CustomerSubNavbarComponent;
  let fixture: ComponentFixture<CustomerSubNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerSubNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerSubNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
