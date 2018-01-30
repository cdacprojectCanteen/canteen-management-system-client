import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { DataTable, DataTableResource } from '../data-table';
import { CartService } from '../../services/cart.service';
import { Category } from '../../pojos/Category';
import { CategoryService } from '../../services/category.service';
import { UpdateCategoryService } from '../../services/update-category.service';
declare var $: any;

@Component({
  selector: 'app-categorylist',
  templateUrl: './categorylist.component.html',
  styleUrls: ['./categorylist.component.css']
})
export class CategoryListComponent implements OnInit {
  categories : Category[] = [];
  categoryResource = new DataTableResource(this.categories);
  category = [];
  categoryCount = 0;
  totalPrice: number = 0;
  position: number;
  categoryToDelete: Category;

  @ViewChild(DataTable) categoryTable: DataTable;

  reloadCategories(params) {
    this.categoryResource.query(params).then(categories => this.category = categories);

  }

  showAddCategory(){
    this.updateCategoryService.setCategory(null);
  }

  showUpdateCategory(item){
    this.updateCategoryService.setCategory(item);
  }

  showDeleteConfirmation(item){
    this.categoryToDelete = item;
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.categoryToDelete.categoryId).subscribe(category=>{
      this.category.splice(
        this.category.indexOf(this.categoryToDelete), 1
      );
    });
  }

  onCategoryUpdated(item) {
    console.log(item);
    this.position = this.category.indexOf(item);
    // update logic
    this.categoryTable.reloadItems();
    this.fetchCategories();
  }
  constructor(private categoryService: CategoryService, private updateCategoryService: UpdateCategoryService) {
    
    this.fetchCategories();
    
  }

  fetchCategories(){
    let subscription = this.categoryService.getCategories().subscribe(categories=>{
      this.categoryResource = new DataTableResource(categories);
      this.categoryResource.count().then(count => this.categoryCount = count);
      this.categoryTable.reloadItems();
    });
  }

  onCategoryAdded(category: Category){
    this.category.push(category);
  }

  ngOnInit(){

  }
}
