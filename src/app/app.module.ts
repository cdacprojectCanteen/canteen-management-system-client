import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { ProductBoxComponent } from './components/product-box/product-box.component';
import { MenuComponent } from './components/menu/menu.component';
import { SignupComponent } from './components/signup/signup.component';
import { ContactusComponent } from './components/contactus/contactus.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { SignupFormComponent } from './components/signup-form/signup-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TestcComponent } from './components/testc/testc.component';

import { TestServiceService } from './services/test-service.service';
import { ProductService } from './services/product.service';
import { CustomerService } from './services/customer.service';
import { AccountService } from './services/account.service';
import { EmployeeDashboardComponent } from './components/employee-dashboard/employee-dashboard.component';
import { EmployeeGuard } from './guards/employee.guard';
import { EmployeeLoginComponent } from './components/employee-login/employee-login.component';
import { EmployeeService } from './services/employee.service';
import { EmployeeViewOrdersComponent } from './components/employee-view-orders/employee-view-orders.component';
import { EmployeeManageProductsComponent } from './components/employee-manage-products/employee-manage-products.component';
import { EmployeeManageEmployeesComponent } from './components/employee-manage-employees/employee-manage-employees.component';
import { EmployeeAddProductFormComponent } from './components/employee-add-product-form/employee-add-product-form.component';
import { EmployeeAddEmployeeFormComponent } from './components/employee-add-employee-form/employee-add-employee-form.component';
import { EmployeeViewOrderHistoryComponent } from './components/employee-view-order-history/employee-view-order-history.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { CustomerGuard } from './guards/customer.guard';
import { CategoryService } from './services/category.service';
import { DataTableModule } from './components/data-table';
import { CommonModule } from '@angular/common';
import { EmployeeManageProductCategoriesComponent } from './components/employee-manage-product-categories/employee-manage-product-categories.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { UpdateProductChannelService } from './services/update-product-channel.service';
import { CartComponent } from './components/cart/cart.component';
import { CartService } from './services/cart.service';
import { AnyExceptEmployeeGuard } from './guards/any-except-employee.guard';
import { EmployeeAddCategoryComponent } from './components/employee-add-category/employee-add-category.component';
import { CategoryListComponent } from './components/categorylist/categorylist.component';
import { UpdateCategoryService } from './services/update-category.service';
import { EmployeeOrderListComponent } from './components/employee-order-list/employee-order-list.component';
import { OrderService } from './services/order.service';
import { UpdateOrderService } from './services/update-order.service';
import { CustomerOrderListComponent } from './components/customer-order-list/customer-order-list.component';
import { RedeemCouponComponent } from './components/redeem-coupon/redeem-coupon.component';


const routes: Routes = [
  {
    path : '',
    redirectTo : "/menu",
    pathMatch : 'full'
  },
  {path : 'menu', component : MenuComponent, canActivate: [AnyExceptEmployeeGuard]},
  {path : 'home', component: HomeComponent, canActivate: [AnyExceptEmployeeGuard]},
  {path : 'cart', component: CartComponent, canActivate: [CustomerGuard]},
  {path : 'orders', component: CustomerOrderListComponent, canActivate: [CustomerGuard]},
  {path : 'dashboard', redirectTo: 'employee/dashboard', pathMatch: 'full'},
  {path : 'employee', component: EmployeeHomeComponent, canActivate: [EmployeeGuard],
          children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: EmployeeDashboardComponent},
            {path: 'orders', component: EmployeeViewOrdersComponent},
            {path: 'products', component: EmployeeManageProductsComponent},
            {path: 'products/categories', component: EmployeeManageProductCategoriesComponent},
            {path: 'manage', component: EmployeeManageEmployeesComponent},
            {path: 'history', component: EmployeeViewOrderHistoryComponent},
          ]},
  {path : 'contactus', component: ContactusComponent, canActivate: [CustomerGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    ProductBoxComponent,
    MenuComponent,
    SignupComponent,
    ContactusComponent,
    AboutusComponent,
    SignupFormComponent,
    NavbarComponent,
    HomeComponent,
    TestcComponent,
    EmployeeDashboardComponent,
    EmployeeLoginComponent,
    EmployeeViewOrdersComponent,
    EmployeeManageProductsComponent,
    EmployeeManageEmployeesComponent,
    EmployeeAddProductFormComponent,
    EmployeeAddEmployeeFormComponent,
    EmployeeViewOrderHistoryComponent,
    EmployeeHomeComponent,
    EmployeeManageProductCategoriesComponent,
    ProductlistComponent,
    CartComponent,
    EmployeeAddCategoryComponent,
    CategoryListComponent,
    EmployeeOrderListComponent,
    CustomerOrderListComponent,
    RedeemCouponComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot( routes ),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DataTableModule
  ],
  providers: [
    TestServiceService,
    ProductService,
    CustomerService,
    AccountService,
    EmployeeService,
    CategoryService,
    UpdateProductChannelService,
    CartService,
    OrderService,
    UpdateOrderService,
    UpdateCategoryService,
    EmployeeGuard,
    CustomerGuard,
    AnyExceptEmployeeGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
