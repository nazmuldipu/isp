import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListChildComponent } from './customer-list-child.component';

describe('CustomerListChildComponent', () => {
  let component: CustomerListChildComponent;
  let fixture: ComponentFixture<CustomerListChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
