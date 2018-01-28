import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTable, DataTableResource } from '../data-table';
import { ProductService } from '../../services/product.service';
import { Product } from '../../pojos/Product';
import { UpdateProductChannelService } from '../../services/update-product-channel.service';
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  products : Product[] = [];
  productResource = new DataTableResource(this.products);
  product = [];
  productCount = 0;
  @ViewChild(DataTable) productTable: DataTable;
  position: number;

  reloadProducts(params) {
    this.productResource.query(params).then(productslist => this.product = productslist);

  }
tval = false;
  myf(){
    this.tval=true;
    console.log('Hello');
    this.updateProductService.setProduct(null);
  }

  tval2 = false;
  myf2(item){
    this.tval2=true;
    console.log('Hello');
    this.updateProductService.setProduct(item);
  }

  deleteProduct(item) {
    // this.product.splice(
    //   this.product.indexOf(item), 1
    // );
    // console.log(item.productId);
    this.productService.deleteProduct(item.productId).subscribe(product=>{
      this.product.splice(
        this.product.indexOf(item), 1
      );
      // this.productCount = this.product.length;
    });
    // A service should be called to remove product from database
  }

  onProductUpdated(item) {
    console.log(item);
    this.position = this.product.indexOf(item);
    // update logic
    this.productTable.reloadItems();
    this.fetchProducts();
  }
  constructor(private productService: ProductService, private updateProductService: UpdateProductChannelService) {
    
    this.fetchProducts();
    
  }

  fetchProducts(){
    let subscription = this.productService.getProducts().subscribe(products=>{
      // this.products = products;
      // this.product = products;
      this.productResource = new DataTableResource(products);
      // this.productCount = products.length;
      this.productResource.count().then(count => this.productCount = count);
      this.productTable.reloadItems();
    });
  }

  onProductAdded(product: Product){
    this.product.push(product);
    // this.productCount = this.product.length;
  }

  ngOnInit() {
  }

}
