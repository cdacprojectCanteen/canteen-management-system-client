import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../services/account.service';

@Injectable()
export class CustomerGuard implements CanActivate {
  isEmployee: boolean = false;
  isLoggedIn: boolean = false;
  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.IsEmployee().subscribe(isEmployee=>this.isEmployee=isEmployee);
    this.accountService.IsLoggedIn().subscribe(isLoggedIn=>this.isLoggedIn=isLoggedIn);
  }

  canActivate(){
    
    // console.log(this.isEmployee);
    if(!this.isEmployee && this.isLoggedIn)
      return true;
    this.router.navigateByUrl('/');
    return false;
  }
}
