import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountingSubNavbarComponent } from './accounting-sub-navbar.component';

describe('AccountingSubNavbarComponent', () => {
  let component: AccountingSubNavbarComponent;
  let fixture: ComponentFixture<AccountingSubNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountingSubNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountingSubNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
