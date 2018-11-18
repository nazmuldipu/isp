import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginateReverseComponent } from './paginate-reverse.component';

describe('PaginateReverseComponent', () => {
  let component: PaginateReverseComponent;
  let fixture: ComponentFixture<PaginateReverseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginateReverseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginateReverseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
