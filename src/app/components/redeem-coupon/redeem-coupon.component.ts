import { Component, OnInit } from '@angular/core';
import { Order } from '../../pojos/Order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-redeem-coupon',
  templateUrl: './redeem-coupon.component.html',
  styleUrls: ['./redeem-coupon.component.css']
})
export class RedeemCouponComponent implements OnInit {

  private order: Order = null;
  private invalid: boolean = false;
  private redeemed: boolean = false;
  private orderNotReady: boolean = false;
  private orderAlreadyDelivered: boolean = false;
  private orderAmount:number = -1;

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  findOrderByCoupon(item){
    console.log(item.value);
    this.orderService.getOrderByCoupon(item.value).subscribe(order=>{
      console.log(order);
      if(order.orderId!=-1){
        this.invalid = false;
        if(order.orderStatus==='READY'){
          this.order = order;
          this.orderAmount = 0;
          for(let product of order.products){
            this.orderAmount += product.price * product.quantity;
          }
        }
        if(order.orderStatus==='DELIVERED')
          this.orderAlreadyDelivered = true;
        if(order.orderStatus==='NEW')
          this.orderNotReady=true;
      }
      else{
        this.invalid = true;
      }
    });
  }

  redeem(){
    this.order.orderStatus='DELIVERED';
    this.orderService.updateOrder(this.order).subscribe(order=>{
      this.order = null;
      this.invalid = false;
      this.redeemed = false;
      this.orderNotReady = false;
      this.orderAlreadyDelivered = false;
    });
  }

}
