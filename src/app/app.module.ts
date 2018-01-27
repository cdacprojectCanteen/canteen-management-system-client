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


const routes: Routes = [
  {
    path : '',
    redirectTo : "/menu",
    pathMatch : 'full'
  },
  {path : 'menu', component : MenuComponent, canActivate: [CustomerGuard]},
  {path : 'home', component: HomeComponent, canActivate: [CustomerGuard]},
  {path : 'dashboard', redirectTo: 'employee/dashboard', pathMatch: 'full'},
  {path : 'employee', component: EmployeeHomeComponent, canActivate: [EmployeeGuard],
          children: [
            {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
            {path: 'dashboard', component: EmployeeDashboardComponent},
            {path: 'orders', component: EmployeeViewOrdersComponent},
            {path: 'products', component: EmployeeManageProductsComponent},
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
    EmployeeHomeComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot( routes ),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TestServiceService,
    ProductService,
    CustomerService,
    AccountService,
    EmployeeService,
    CategoryService,
    EmployeeGuard,
    CustomerGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
