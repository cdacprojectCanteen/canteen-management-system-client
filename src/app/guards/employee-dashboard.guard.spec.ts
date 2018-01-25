import { TestBed, async, inject } from '@angular/core/testing';

import { EmployeeDashboardGuard } from './employee-dashboard.guard';

describe('EmployeeDashboardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmployeeDashboardGuard]
    });
  });

  it('should ...', inject([EmployeeDashboardGuard], (guard: EmployeeDashboardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
