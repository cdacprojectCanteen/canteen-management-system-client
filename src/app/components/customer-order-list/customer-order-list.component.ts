import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableResource, DataTable } from '../data-table/index';
import { Order } from '../../pojos/Order';
import { OrderService } from '../../services/order.service';
import { UpdateOrderService } from '../../services/update-order.service';
import { AccountService } from '../../services/account.service';
import { Customer } from '../../pojos/Customer';

@Component({
  selector: 'app-customer-order-list',
  templateUrl: './customer-order-list.component.html',
  styleUrls: ['./customer-order-list.component.css']
})
export class CustomerOrderListComponent implements OnInit {

  customer: Customer;
  orders : Order[] = [];
  orderResource = new DataTableResource(this.orders);
  order = [];
  orderCount = 0;
  @ViewChild(DataTable) orderTable: DataTable;
  position: number;
  private couponCode:string = null;

  reloadOrders(params) {
    this.orderResource.query(params).then(orderslist => this.order = orderslist);

  }
tval = false;
  myf(){
    this.tval=true;
    console.log('Hello');
    // this.updateOrderService.setOrder(null);
  }

  tval2 = false;
  myf2(item){
    this.tval2=true;
    console.log('Hello');
    // this.updateOrderService.setOrder(item);
  }

  deleteOrder(item) {
    // this.order.splice(
    //   this.order.indexOf(item), 1
    // );
    // console.log(item.orderId);
    // this.orderService.deleteOrder(item.orderId).subscribe(order=>{
    //   this.order.splice(
    //     this.order.indexOf(item), 1
    //   );
      // this.orderCount = this.order.length;
    // });
    // A service should be called to remove order from database
  }

  onOrderUpdated(item) {
    console.log(item);
    this.position = this.order.indexOf(item);
    // update logic
    this.orderTable.reloadItems();
    this.fetchOrders(this.customer.id);
  }
  constructor(private orderService: OrderService, private accountService: AccountService) {
    
    this.accountService.getCustomer().subscribe(customer=>{
      if(customer != null){
        console.log(customer);
        this.customer = customer;
        this.fetchOrders(customer.id);
      }
    });
  }

  fetchOrders(customerId){
    let subscription = this.orderService.getOrdersOf(customerId).subscribe(orders=>{
      // this.orders = orders;
      // this.order = orders;
      console.log(orders);
      this.orderResource = new DataTableResource(orders);
      // this.orderCount = orders.length;
      this.orderResource.count().then(count => this.orderCount = count);
      this.orderTable.reloadItems();
    });
  }

  onOrderAdded(order: Order){
    this.order.push(order);
    // this.orderCount = this.order.length;
  }

  showCoupon(item){
    this.couponCode = item.couponCode;
  }

  ngOnInit() {
  }

}
