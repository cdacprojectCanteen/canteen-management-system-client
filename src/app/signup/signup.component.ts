import { Component, OnInit, NgModule, Pipe } from '@angular/core';
import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
myform: FormGroup;

  constructor() { }

  ngOnInit() {
    this.myform = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.pattern('[^ @]*@[^ @]*')]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      phoneNo: new FormControl('', [Validators.required, Validators.minLength(10)]),
      address: new FormControl(),
      dateOfBirth: new FormControl('', Validators.required)
    });


  }

}
