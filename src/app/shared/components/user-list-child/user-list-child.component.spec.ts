import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListChildComponent } from './user-list-child.component';

describe('UserListChildComponent', () => {
  let component: UserListChildComponent;
  let fixture: ComponentFixture<UserListChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserListChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
