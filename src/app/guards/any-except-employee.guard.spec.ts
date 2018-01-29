import { TestBed, async, inject } from '@angular/core/testing';

import { AnyExceptEmployeeGuard } from './any-except-employee.guard';

describe('AnyExceptEmployeeGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnyExceptEmployeeGuard]
    });
  });

  it('should ...', inject([AnyExceptEmployeeGuard], (guard: AnyExceptEmployeeGuard) => {
    expect(guard).toBeTruthy();
  }));
});
