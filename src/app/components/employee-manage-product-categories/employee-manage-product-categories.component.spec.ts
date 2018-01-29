import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeManageProductCategoriesComponent } from './employee-manage-product-categories.component';

describe('EmployeeManageProductCategoriesComponent', () => {
  let component: EmployeeManageProductCategoriesComponent;
  let fixture: ComponentFixture<EmployeeManageProductCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeManageProductCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeManageProductCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
