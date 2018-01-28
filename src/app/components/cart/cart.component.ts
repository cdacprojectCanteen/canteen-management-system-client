import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataTable, DataTableResource } from '../data-table';
import { product } from './product-data';
import { CartService } from '../../services/cart.service';
import { Product } from '../../pojos/Product';
declare var $: any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  productResource;
  product = [];
  productCount = 0;
  totalPrice: number = 0;

  @ViewChild(DataTable) cartTable: DataTable;

  calPrice() {
    this.totalPrice = 0;
    this.product.forEach(element => {
      
      this.totalPrice += Number(element.price)*element.quantity;
      this.cdr.detectChanges();
    });
      }

  reloadCars(params) {
    this.productResource.query(params).then( products => this.product = products);
    this.calPrice();

  }

  deleteProduct(item) {
    this.cartService.removeProduct(item);
    this.product.splice(
      this.product.indexOf(item), 1
    );
    this.calPrice();
  }

  updateProduct(item){
    console.log(item.quantity);
    this.cartService.updateProductCount(item.productId, item.quantity);
  }

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef) {
    let products = cartService.getOrder().products;
    this.productResource= new DataTableResource(products);
    this.productResource.count().then(count => this.productCount = count);
   }

  //  myf(products:Product[]){
  //   let productOrder; //{product,count}
  //   products.forEach((product)=>{

  //   });
  //  }

   ngAfterViewChecked(){
    this.calPrice();
  }

  ngOnInit() {
  }

}
