import { Component, OnInit } from '@angular/core';
import { Product } from '../../pojos/Product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../pojos/Category';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  products: Product[];
  errorMessage: String;

  productToAdd : Product;

  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.fetchProducts();
    this.productToAdd = new Product();
    this.productToAdd.name = "Kaaju Katli";
    var category = new Category();
    category.categoryId=1;
    this.productToAdd.category = category;
    this.productToAdd.price = 30;
    this.productToAdd.oldPrice = 50;
    this.productToAdd.quantity = 30;
    // this.addProduct(this.productToAdd);
  }
  fetchProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products,
      error => this.errorMessage = <any>error);
  }
  addProduct(product: Product): void {
    this.productService.addProduct(product)
      .subscribe( product => {
                this.fetchProducts(); 						   
           },
                    error => this.errorMessage = <any>error);
  }
}
