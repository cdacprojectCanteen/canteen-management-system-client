import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  @Output() onProductAdded = new EventEmitter<Product>();

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addProduct(product:Product){
    if(this.cartService.addProduct(product)){
      this.onProductAdded.emit(product);
    }
  }

}
