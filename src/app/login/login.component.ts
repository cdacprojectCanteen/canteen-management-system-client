import { Component, OnInit, NgModule, Pipe } from '@angular/core';
import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginform: FormGroup;
  constructor() { }

  ngOnInit() {
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])

    });
  }

}
