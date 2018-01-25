import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddEmployeeFormComponent } from './employee-add-employee-form.component';

describe('EmployeeAddEmployeeFormComponent', () => {
  let component: EmployeeAddEmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeAddEmployeeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddEmployeeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddEmployeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
