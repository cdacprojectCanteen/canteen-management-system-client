import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AccountService } from '../services/account.service';

@Injectable()
export class EmployeeGuard implements CanActivate {
  isEmployee: boolean = false;
  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.IsEmployee().subscribe(isEmployee=>this.isEmployee=isEmployee);
  }

  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //     if(this.accountService.IsEmployee)
  //       return true;
  //     return false;
  // }

  canActivate(){
    
    console.log(this.isEmployee);
    if(this.isEmployee)
      return true;
    this.router.navigateByUrl('/');
    return false;
  }
}
