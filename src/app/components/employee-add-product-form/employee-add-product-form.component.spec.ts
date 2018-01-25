import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddProductFormComponent } from './employee-add-product-form.component';

describe('EmployeeAddProductFormComponent', () => {
  let component: EmployeeAddProductFormComponent;
  let fixture: ComponentFixture<EmployeeAddProductFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddProductFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddProductFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
