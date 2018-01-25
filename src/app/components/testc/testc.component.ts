import { Component, OnInit } from '@angular/core';
import { Product } from '../../pojos/Product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-testc',
  templateUrl: './testc.component.html',
  styleUrls: ['./testc.component.css']
})
export class TestcComponent implements OnInit {

  products: Product[];
  errorMessage: String;

  product = new Product();
  constructor(private productService: ProductService) { }
  ngOnInit() {
    // this.fetchProducts();
    // console.log(this.products);
    // this.products.toString();
  }
  fetchProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products,
      error => this.errorMessage = <any>error);
  }

}
