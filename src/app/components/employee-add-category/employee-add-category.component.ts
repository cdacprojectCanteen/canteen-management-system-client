import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Category } from '../../pojos/Category';
import { CategoryService } from '../../services/category.service';
import { Subscription } from 'rxjs/Subscription';
import { UpdateCategoryService } from '../../services/update-category.service';
declare var $: any;

@Component({
  selector: 'app-employee-add-category',
  templateUrl: './employee-add-category.component.html',
  styleUrls: ['./employee-add-category.component.css']
})
export class EmployeeAddCategoryComponent implements OnInit {
  _updateCategory: Category = null;
  private _addCategoryForm: FormGroup;
  private subscriptions: Subscription = new Subscription();
  @Output() onCategoryAdded = new EventEmitter<Category>();
  @Output() onCategoryUpdated = new EventEmitter<Category>();
  private errorMessage: string;

  constructor(private categoryService: CategoryService, private updateCategoryService: UpdateCategoryService) { }

  onSubmit() {
    
    let category = new Category();
    category.name = this._addCategoryForm.controls.name.value;
    
    this.addCategory(category);
    
    $('#addCategory').modal('hide');
  }

  addCategory(category: Category): void {

    var subscription;

      if(this._updateCategory == null){
        
        subscription = this.categoryService.addCategory(category)
        .subscribe(categoryId => {
          category.categoryId = categoryId;
          console.log(category);
          this.onCategoryAdded.emit(category);
        },
        error => this.errorMessage = <any>error);
      }
      else{
        category.categoryId = this._updateCategory.categoryId;
        subscription = this.categoryService.updateCategory(category)
      .subscribe(categoryId => {
        this.onCategoryUpdated.emit(category);
      },
      error => this.errorMessage = <any>error);
      }
    this.subscriptions.add(subscription);
  }

  ngOnInit() {
    this._addCategoryForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    this.updateCategoryService.getCategory().subscribe((category)=>{
      if(category!=null){
        console.log('update arrived')
        this._updateCategory = category;
        this._addCategoryForm.setValue({
          name: category.name
        });
      }
      else{
        this._addCategoryForm.reset({category:'Please select a category'});
      }
    });
  }

}
