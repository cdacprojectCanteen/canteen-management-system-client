import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/';
import { Product } from '../../pojos/Product';
import { config } from '../../config';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() product : Product;
  imageUrl = config.imageUrl;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addProduct(product:Product){
    this.cartService.addProduct(product);
  }

}
