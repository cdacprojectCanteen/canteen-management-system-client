import { Component, OnInit, NgModule, Pipe } from '@angular/core';
import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {
loginform: FormGroup;
invalidLogin: boolean = false;
// shouldDisplay: boolean = true;
constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
    this.loginform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  employeeLogin(){
    this.invalidLogin = false;
    this.accountService
    .doEmployeeLogin(this.loginform.controls.username.value, this.loginform.controls.password.value)
    .subscribe(valid=>{
      console.log("Observed: "+valid);
      this.invalidLogin = !valid;
      if(valid){
        this.router.navigateByUrl('/dashboard');
        // this.shouldDisplay = false;
        $('#employeeLoginModal').modal('hide');
      }
    });
  }
}
