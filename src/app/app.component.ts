import { Component } from '@angular/core';
import { Customer } from './pojos/Customer';
import { AccountService } from './services/account.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Canteen Management System';
  isEmployee: boolean = true;

  constructor(private accountService: AccountService){
    this.accountService.restoreLoginState();
    this.accountService.IsLoggedIn().subscribe(loggedIn => {
      this.accountService.IsEmployee().subscribe(isEmployee => {
          this.isEmployee = isEmployee;
      });
    });
  } 

  // loggedIn : boolean = false;
  // loggedInCustomer : Customer;

  // constructor(private router: Router){

  // }

  // onLoggedIn(loggedIn: boolean) {
  //   this.loggedIn = loggedIn;
  // }
  // onLoggedInCustomer(customer: Customer){
  //   this.loggedInCustomer = customer;
  //   if(this.loggedInCustomer != null)
  //     this.router.navigateByUrl('/home');
  //   else
  //     this.router.navigateByUrl('/');
  // }
}
