import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable, DataTableResource } from '../data-table';
import { products } from './products';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  productResource = new DataTableResource(products);
  product = [];
  @ViewChild(DataTable) cartTable: DataTable;
  position: number;

  reloadProducts(params) {
    this.productResource.query(params).then( productslist => this.product = productslist);

  }

  deleteProduct(item) {
    this.product.splice(
      this.product.indexOf(item), 1
    );
    // A service should be called to remove product from database
  }

  updateProduct(item) {
    this.position = this.product.indexOf(item);
    // update logic

  }
  constructor() { }

  ngOnInit() {
  }

}
