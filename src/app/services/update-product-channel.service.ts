import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Product } from '../pojos/Product';

@Injectable()
export class UpdateProductChannelService {

  constructor() { }

  private product = new BehaviorSubject<Product>(null);

  setProduct(product:Product){
    this.product.next(product);
  }

  getProduct(): BehaviorSubject<Product>{
    return this.product;
  }

}
