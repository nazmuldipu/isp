import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSubNavbarComponent } from './user-sub-navbar.component';

describe('UserSubNavbarComponent', () => {
  let component: UserSubNavbarComponent;
  let fixture: ComponentFixture<UserSubNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSubNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSubNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
