import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManageEmployeesComponent } from './employee-manage-employees.component';

describe('EmployeeManageEmployeesComponent', () => {
  let component: EmployeeManageEmployeesComponent;
  let fixture: ComponentFixture<EmployeeManageEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeManageEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManageEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
