import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core/';
import { Product } from '../../pojos/Product';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css']
})
export class ProductBoxComponent implements OnInit {

  @Input() product : Product;

  constructor() { }

  ngOnInit() {
  }

}
