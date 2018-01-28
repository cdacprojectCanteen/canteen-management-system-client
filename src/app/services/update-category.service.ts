import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Category } from '../pojos/Category';

@Injectable()
export class UpdateCategoryService {

  constructor() { }

  private category = new BehaviorSubject<Category>(null);

  setCategory(category:Category){
    this.category.next(category);
  }

  getCategory(): BehaviorSubject<Category>{
    return this.category;
  }
}
