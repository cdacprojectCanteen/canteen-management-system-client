import { Component, OnInit } from '@angular/core';
import { EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';

import { Customer } from '../../pojos/Customer';
import { AccountService } from '../../services/account.service';
import 'rxjs/add/operator/map';
import { CustomerService } from '../../services/customer.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private _loginForm: FormGroup;
  private errorMessage: string;
  private loggedIn = false;
  private invalidLogin = false;
  private userFirstName: string;
  private isEmployee: boolean;

  constructor(private accountService: AccountService) {
    this.accountService.IsLoggedIn().subscribe(loggedIn => {
      this.loggedIn = loggedIn;
      console.log('updated loggedIn value in navbar');
      this.accountService.IsEmployee().subscribe(isEmployee => {
        if (isEmployee && loggedIn) {
          this.isEmployee = true;
          this.accountService.getEmployee().subscribe(employee => {
            if (employee != null)
              this.userFirstName = employee.firstName;
          });
        }
        else {
          this.accountService.getCustomer().subscribe(customer => {
            if (customer != null)
              this.userFirstName = customer.firstName;
          });
        }
      });
    });

  }

  ngOnInit() {
    this._loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
    // this.accountService.IsLoggedIn().subscribe(loggedIn=>{this.loggedIn = loggedIn; console.log('updated loggedIn value in navbar');});
    // this.loggedIn = this.accountService.IsLoggedIn();
  }

  customerLogin() {
    this.invalidLogin = false;
    this.accountService
      .doCustomerLogin(this._loginForm.controls.username.value, this._loginForm.controls.password.value)
      .subscribe(valid => {
        console.log("Observed: " + valid);
        this.invalidLogin = !valid;
      });
    // this.accountService
    // .doCustomerLogin(this._loginForm.controls.username.value, this._loginForm.controls.password.value);
  }

  logout() {
    this.accountService.doLogout();
    // this.loggedIn = this.accountService.IsLoggedIn();
  }

  // @Output() onLoggedIn = new EventEmitter<boolean>();
  // @Output() onLoggedInCustomer = new EventEmitter<Customer>();
  // loggedIn = false;
  // customer : Customer;

  // logIn(customer: Customer) {
  //   this.loggedIn = true;
  //   this.onLoggedIn.emit(this.loggedIn);
  //   this.customer = customer;
  //   this.onLoggedInCustomer.emit(this.customer);
  // }

  // logout(){
  //   this.loggedIn = false;
  //   this.onLoggedIn.emit(this.loggedIn);
  //   this.customer = null;
  //   this.onLoggedInCustomer.emit(this.customer);
  // }

  // customerLogin(customer: Customer): void {
  //   this.accountService.customerLogin(this._loginForm.controls.username.value, this._loginForm.controls.password.value)
  //     .subscribe(customer => {
  //       console.log(customer);
  //       // console.log("ID: "+customer.Id);
  //       console.log("ID: "+customer.id);
  //       if(customer===null || customer === undefined || customer.id === -1){
  //         console.log("Invalid User");
  //         console.log(customer);

  //       }
  //       else{
  //         console.log("Valid User");
  //         this.logIn(customer);
  //       }
  //     },
  //     error => this.errorMessage = <any>error);
  // }

}
