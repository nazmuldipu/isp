import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListChildComponent } from './company-list-child.component';

describe('CompanyListChildComponent', () => {
  let component: CompanyListChildComponent;
  let fixture: ComponentFixture<CompanyListChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyListChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
