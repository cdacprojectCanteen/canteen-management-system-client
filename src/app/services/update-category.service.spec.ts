import { TestBed, inject } from '@angular/core/testing';

import { UpdateCategoryService } from './update-category.service';

describe('UpdateCategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UpdateCategoryService]
    });
  });

  it('should be created', inject([UpdateCategoryService], (service: UpdateCategoryService) => {
    expect(service).toBeTruthy();
  }));
});
