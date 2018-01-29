import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataTable, DataTableResource } from '../data-table';
import { product } from './product-data';
import { CartService } from '../../services/cart.service';
import { Product } from '../../pojos/Product';
import { Router } from '@angular/router';
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
  couponCode: string = null;
  itemToRemove = null;

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

  deleteProduct() {
    this.cartService.removeProduct(this.itemToRemove);
    this.product.splice(
      this.product.indexOf(this.itemToRemove), 1
    );
    this.calPrice();
  }

  updateProduct(item){
    console.log(item.quantity);
    this.cartService.updateProductCount(item.productId, item.quantity);
  }

  constructor(private cartService: CartService, private cdr: ChangeDetectorRef, private router: Router) {
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

  checkout(){
    if(this.cartService.getOrder().products.length>0){
      this.cartService.placeOrder().subscribe(coupon=>{
        console.log(coupon);
        this.cartService.clearCart();
        // this.productResource= new DataTableResource(this.cartService.getOrder().products);
        // this.cartTable.reloadItems();
        
        this.couponCode = coupon;
        $('#orderSuccessfulDialogModal').modal('show');
      });
    }
    else{
      $('#noItemsInCartDialogModal').modal('show');
    }
  }
  
  orderSuccessDialogClosed(){
    this.router.navigateByUrl('/orders');
  }

  removeFromCart(item){
    console.log('clicked')
    this.itemToRemove = item;
    console.log(this.itemToRemove);
    // $('#confirmDialogModal').modal('show');
  }

  ngOnInit() {
  }

}
