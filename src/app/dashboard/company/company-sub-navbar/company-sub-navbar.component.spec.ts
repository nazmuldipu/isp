import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanySubNavbarComponent } from './company-sub-navbar.component';

describe('CompanySubNavbarComponent', () => {
  let component: CompanySubNavbarComponent;
  let fixture: ComponentFixture<CompanySubNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanySubNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanySubNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
