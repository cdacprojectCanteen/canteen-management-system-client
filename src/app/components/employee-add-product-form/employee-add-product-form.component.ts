import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Product } from '../../pojos/Product';
import { ProductService } from '../../services/product.service';
import { Category } from '../../pojos/Category';
import { CategoryService } from '../../services/category.service';
import { OnDestroy, AfterViewInit, AfterContentChecked } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';
import { config } from '../../config';
import { UpdateProductChannelService } from '../../services/update-product-channel.service';
declare var $: any;


@Component({
  selector: 'app-employee-add-product-form',
  templateUrl: './employee-add-product-form.component.html',
  styleUrls: ['./employee-add-product-form.component.css']
})
export class EmployeeAddProductFormComponent implements OnInit, OnDestroy {

  _updateProduct: Product = null;

  private errorMessage: string;
  @ViewChild("fileInput") fileInput;

  private _productPicUrl: string;
  private _productPicUrl2: string = null;
  private _addProductForm: FormGroup;
  private _categories: Category[];

  @Output() onProductAdded = new EventEmitter<Product>();
  @Output() onProductUpdated = new EventEmitter<Product>();

  private subscriptions: Subscription = new Subscription();

  constructor(private productService: ProductService, private categoryService: CategoryService, private updateProductService: UpdateProductChannelService) {
    // this._productPicUrl = (this._updateProduct)?config.imageUrl+this._updateProduct.productImageUrl:'../../../assets/images/user_male.png';
    var subscription = this.categoryService.getCategories().subscribe(categories => { this._categories = categories });
    this.subscriptions.add(subscription);
    
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  onSubmit() {

    if(
      this._addProductForm.controls.name.valid
                          &&
      this._addProductForm.controls.category.valid
                          &&
      this._addProductForm.controls.price.valid
                          &&
      this._addProductForm.controls.tags.valid
                          &&
      this._addProductForm.controls.description.valid
    ){
    
      let product = new Product();
      product.name = this._addProductForm.controls.name.value;
      let category = new Category();
      category.categoryId = this._addProductForm.controls.category.value;
      product.category = category;
      product.price = this._addProductForm.controls.price.value;
      // product.quantity = this._addProductForm.controls.quantity.value;
      let tags = (this._addProductForm.controls.tags.value) ? this._addProductForm.controls.tags.value.toString().split(","):[];
      product.tags = tags;
      product.description = this._addProductForm.controls.description.value;
      product.productImageUrl = this._productPicUrl2;
      this.addProduct(product);
      
      $('#addProductModal').modal('hide');
    }
  }


  addProduct(product: Product): void {
    let fi = this.fileInput.nativeElement;
    let fileToUpload;
    if (fi.files && fi.files[0]) {
      fileToUpload = fi.files[0];
    }
    else {
      fileToUpload = null;
    }

    var subscription;

      if(this._updateProduct == null){
        
        subscription = this.productService.addProduct(product, fileToUpload)
        .subscribe(productId => {
          this.productService.getProduct(productId).subscribe(productRec=>{
            console.log(productRec);
            this.onProductAdded.emit(productRec);
          });
          
        },
        error => this.errorMessage = <any>error);
      }
      else{
        product.productId = this._updateProduct.productId;
        subscription = this.productService.updateProduct(product, fileToUpload)
      .subscribe(productRec => {
        console.log(productRec);
        this.onProductUpdated.emit(productRec);
      },
      error => this.errorMessage = <any>error);
      }
    this.subscriptions.add(subscription);
  }

  readUrl(event:any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      this._productPicUrl2 = event.target.files.item(0).name;
  console.log(this._productPicUrl2);
      reader.onload = (event:any) => {
        this._productPicUrl = event.target.result;
        
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  ngOnInit() {
    this._addProductForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      category: new FormControl('Please select a category'),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      // quantity: new FormControl('', [Validators.required, Validators.min(0)]),
      tags: new FormControl(''),
      description: new FormControl(''),
      productImageUrl: new FormControl()
    });

    this.updateProductService.getProduct().subscribe((product)=>{
      this._productPicUrl = (product!=null)?config.imageUrl+product.productImageUrl:'../../../assets/images/user_male.png';
      if(product!=null){
        console.log('update arrived')
        this._updateProduct = product;
        this._addProductForm.setValue({
          name: product.name,
          category: product.category.categoryId,
          price: product.price,
          // quantity: product.quantity,
          tags: product.tags,
          description: product.description,
          productImageUrl: ''
        });
      }
      else{
        this._addProductForm.reset({category:'Please select a category'});
      }
    });

    $("#imgBrowse").click(()=>{
      $("#imgInput").click();
    });
    

    //jQuery time
    var current_fs, next_fs, previous_fs; //fieldsets
    var left, opacity, scale; //fieldset properties which we will animate
    var animating; //flag to prevent quick multi-click glitches

    $(".next").click(function () {
      if (animating) return false;
      animating = true;

      current_fs = $(this).parent();
      next_fs = $(this).parent().next();

      //activate next step on progressbar using the index of next_fs
      $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

      //show the next fieldset
      next_fs.show();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale current_fs down to 80%
          scale = 1 - (1 - now) * 0.2;
          //2. bring next_fs from the right(50%)
          left = (now * 50) + "%";
          //3. increase opacity of next_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({
            'transform': 'scale(' + scale + ')',
            'position': 'absolute'
          });
          next_fs.css({ 'left': left, 'opacity': opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      });
    });

    $(".previous").click(function () {
      if (animating) return false;
      animating = true;

      current_fs = $(this).parent();
      previous_fs = $(this).parent().prev();

      //de-activate current step on progressbar
      $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

      //show the previous fieldset
      previous_fs.show();
      //hide the current fieldset with style
      current_fs.animate({ opacity: 0 }, {
        step: function (now, mx) {
          //as the opacity of current_fs reduces to 0 - stored in "now"
          //1. scale previous_fs from 80% to 100%
          scale = 0.8 + (1 - now) * 0.2;
          //2. take current_fs to the right(50%) - from 0%
          left = ((1 - now) * 50) + "%";
          //3. increase opacity of previous_fs to 1 as it moves in
          opacity = 1 - now;
          current_fs.css({ 'left': left });
          previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
        },
        duration: 800,
        complete: function () {
          current_fs.hide();
          animating = false;
        },
        //this comes from the custom easing plugin
        easing: 'easeInOutBack'
      });
    });

    // $(".submit").click(function () {
    //   return false;
    // });



  }

}