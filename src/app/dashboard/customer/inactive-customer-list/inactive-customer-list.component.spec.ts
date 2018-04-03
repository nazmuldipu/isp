import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveCustomerListComponent } from './inactive-customer-list.component';

describe('InactiveCustomerListComponent', () => {
  let component: InactiveCustomerListComponent;
  let fixture: ComponentFixture<InactiveCustomerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveCustomerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveCustomerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
