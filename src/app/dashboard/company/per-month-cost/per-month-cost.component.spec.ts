import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerMonthCostComponent } from './per-month-cost.component';

describe('PerMonthCostComponent', () => {
  let component: PerMonthCostComponent;
  let fixture: ComponentFixture<PerMonthCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerMonthCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerMonthCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
