import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeAddCategoryComponent } from './employee-add-category.component';

describe('EmployeeAddCategoryComponent', () => {
  let component: EmployeeAddCategoryComponent;
  let fixture: ComponentFixture<EmployeeAddCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeAddCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeAddCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
