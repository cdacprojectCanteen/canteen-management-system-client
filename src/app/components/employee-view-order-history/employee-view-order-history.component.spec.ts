import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewOrderHistoryComponent } from './employee-view-order-history.component';

describe('EmployeeViewOrderHistoryComponent', () => {
  let component: EmployeeViewOrderHistoryComponent;
  let fixture: ComponentFixture<EmployeeViewOrderHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeViewOrderHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewOrderHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
