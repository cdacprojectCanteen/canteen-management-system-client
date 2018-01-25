import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcComponent } from './testc.component';

describe('TestcComponent', () => {
  let component: TestcComponent;
  let fixture: ComponentFixture<TestcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
