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
  productToDelete: Product = null;

  reloadProducts(params) {
    this.productResource.query(params).then(productslist => this.product = productslist);

  }
  openAddProductDialog(){
    this.updateProductService.setProduct(null);
  }

  openUpdateProductDialog(item){
    this.updateProductService.setProduct(item);
  }

  showConfirmDeleteProduct(item){
    this.productToDelete = item;
  }

  deleteProduct() {
    this.productService.deleteProduct(this.productToDelete.productId).subscribe(product=>{
      this.product.splice(
        this.product.indexOf(this.productToDelete), 1
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
