import { Component, OnInit } from '@angular/core';
import { Product } from '../../pojos/Product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../pojos/Category';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  products: Product[];
  errorMessage: String;

  productAddedToCart: Product = null;

  constructor(private productService: ProductService, private router: Router) { }
  ngOnInit() {
    this.fetchProducts();
  }
  fetchProducts(): void {
    this.productService.getProducts()
      .subscribe(products => this.products = products,
      error => this.errorMessage = <any>error);
  }

  goToCart(){
    this.router.navigateByUrl("/cart");
  }

  onProductAdded(product: Product) {
    $('#addToCartSuccessModal').modal('show');
    this.productAddedToCart = product;
  }
}
