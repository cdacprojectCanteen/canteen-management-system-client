import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeViewOrdersComponent } from './employee-view-orders.component';

describe('EmployeeViewOrdersComponent', () => {
  let component: EmployeeViewOrdersComponent;
  let fixture: ComponentFixture<EmployeeViewOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeViewOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeViewOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
