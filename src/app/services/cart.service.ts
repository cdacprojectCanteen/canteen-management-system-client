import { Injectable } from '@angular/core';
import { Order } from '../pojos/Order';
import { AccountService } from './account.service';
import { Product } from '../pojos/Product';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { OrderService } from './order.service';

@Injectable()
export class CartService {
  private order: Order;

  constructor(private accountService: AccountService, private orderService: OrderService) {
    if(localStorage.getItem('cart')===null){
      this.order = new Order();
      this.order.products = [];
    }
    else{
      console.log('restoring cart');
      let cart = localStorage.getItem('cart');
      console.log(cart);
      this.order = JSON.parse(localStorage.getItem('cart')) as Order;
      console.log(this.order);
    }

    
    this.accountService.getCustomer().subscribe(customer=>{
      this.order.customer = customer;
      localStorage.setItem('cart',JSON.stringify(this.order));
    });
   }

  public addProduct(product:Product): boolean{
    // if(this.getProduct(product.productId) == null){
    if(this.order.products.indexOf(product) === -1){
      product.quantity = 1;
      this.order.products.push(product);
    }
    else{
      this.order.products[this.order.products.indexOf(product)].quantity++;
    }
    
    console.log(this.order);
    localStorage.setItem('cart',JSON.stringify(this.order));
    return true;
  }

  public getProduct(productId:number): Product{
    for(let product of this.order.products){
      if(product.productId === productId)
        return product;
    }
    return null;
  }

  public updateProductCount(productId: number, count: number){
    for(let product of this.order.products){
      if(product.productId == productId){
        product.quantity = count;
        console.log(this.order);
        localStorage.setItem('cart',JSON.stringify(this.order));
      }
    }
  }

  public reduceProductCount(product: Product){
    if(this.order.products[this.order.products.indexOf(product)].quantity>0)
      this.order.products[this.order.products.indexOf(product)].quantity--;
    localStorage.setItem('cart',JSON.stringify(this.order));
  }

  public removeProduct(product:Product){
    this.order.products.splice(
      this.order.products.indexOf(product), 1
    );
    localStorage.setItem('cart',JSON.stringify(this.order));
  }

  public getOrder(): Order{
    return this.order;
  }

  public placeOrder():Observable<string>{
    this.order.orderTime=new Date();
    console.log(this.order);
    return this.orderService.addOrder(this.order);
  }

  public clearCart(){
    this.order.products = [];
    localStorage.setItem('cart', JSON.stringify(this.order));
  }
}
