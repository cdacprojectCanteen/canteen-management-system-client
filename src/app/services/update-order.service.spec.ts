import { TestBed, inject } from '@angular/core/testing';

import { UpdateOrderService } from './update-order.service';

describe('UpdateOrderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateOrderService]
    });
  });

  it('should be created', inject([UpdateOrderService], (service: UpdateOrderService) => {
    expect(service).toBeTruthy();
  }));
});
