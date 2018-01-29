import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../services/account.service';

@Injectable()
export class AnyExceptEmployeeGuard implements CanActivate {
  isEmployee: boolean = false;
  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.IsEmployee().subscribe(isEmployee=>this.isEmployee=isEmployee);
  }

  canActivate(){
    
    // console.log(this.isEmployee);
    if(!this.isEmployee)
      return true;
    this.router.navigateByUrl('/employee');
    return false;
  }
}
