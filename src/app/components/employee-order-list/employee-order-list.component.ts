import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable, DataTableResource } from '../data-table';
import { Order } from '../../pojos/Order';
import { OrderService } from '../../services/order.service';
import { UpdateOrderService } from '../../services/update-order.service';

@Component({
  selector: 'app-employee-order-list',
  templateUrl: './employee-order-list.component.html',
  styleUrls: ['./employee-order-list.component.css']
})
export class EmployeeOrderListComponent implements OnInit {

  orders : Order[] = [];
  orderResource = new DataTableResource(this.orders);
  order = [];
  orderCount = 0;
  @ViewChild(DataTable) orderTable: DataTable;
  position: number;

  reloadOrders(params) {
    this.orderResource.query(params).then(orderslist => this.order = orderslist);
  }

  orderReady(item){
    item.orderStatus = 'READY';
    this.orderService.updateOrder(item).subscribe(order=>{
      this.deleteOrder(item);
    });
  }

  deleteOrder(item) {
    this.order.splice(
      this.order.indexOf(item), 1
    );
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
    this.fetchOrders();
  }
  constructor(private orderService: OrderService, private updateOrderService: UpdateOrderService) {
    
    this.fetchOrders();
    
  }

  fetchOrders(){
    let subscription = this.orderService.getOrders().subscribe(orders=>{
      // this.orders = orders;
      // this.order = orders;
      console.log(orders);
      let newOrders = [];
      for(let order of orders){
        if(order.orderStatus == 'NEW')
          newOrders.push(order);
      }
      this.orderResource = new DataTableResource(newOrders);
      // this.orderCount = orders.length;
      this.orderResource.count().then(count => this.orderCount = count);
      this.orderTable.reloadItems();
    });
  }

  onOrderAdded(order: Order){
    this.order.push(order);
    // this.orderCount = this.order.length;
  }

  ngOnInit() {
  }

}
