import { TestBed, inject } from '@angular/core/testing';

import { UpdateProductChannelService } from './update-product-channel.service';

describe('UpdateProductChannelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateProductChannelService]
    });
  });

  it('should be created', inject([UpdateProductChannelService], (service: UpdateProductChannelService) => {
    expect(service).toBeTruthy();
  }));
});
