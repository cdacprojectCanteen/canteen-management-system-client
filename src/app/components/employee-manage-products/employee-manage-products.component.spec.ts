import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManageProductsComponent } from './employee-manage-products.component';

describe('EmployeeManageProductsComponent', () => {
  let component: EmployeeManageProductsComponent;
  let fixture: ComponentFixture<EmployeeManageProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeManageProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManageProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
