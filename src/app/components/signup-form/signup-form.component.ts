import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { Customer } from '../../pojos/Customer';
import { CustomerService } from '../../services/customer.service';
import { EmailValidator } from '../../validators/EmailValidator';
import { PhoneNoValidator } from '../../validators/PhoneNoValidator';
import { AccountService } from '../../services/account.service';
declare var $: any;


@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  private errorMessage: string;
  private isEmployee: boolean = false;

  private _profilePicUrl: string;
  private _signupForm: FormGroup;
  private _password: string;
  private _confirmPassword: string;

  constructor(private customerService: CustomerService) { 
    this._profilePicUrl = "../../../assets/images/user_male.png";
  }

  onSubmit(){
    console.log(this._signupForm.controls);
    let customer = new Customer();
    customer.firstName = this._signupForm.controls.firstName.value;
    customer.lastName = this._signupForm.controls.lastName.value;
    customer.email = this._signupForm.controls.email.value;
    customer.passHash = this._signupForm.controls.password.value;
    customer.phoneNo = this._signupForm.controls.phoneNo.value;
    customer.gender = this._signupForm.controls.gender.value;
    customer.dateOfBirth = this._signupForm.controls.dateOfBirth.value;
    customer.dateOfJoining = new Date();
    console.log(customer);
    this.addCustomer(customer);
  }
  

  addCustomer(customer: Customer): void {
    this.customerService.addCustomer(customer)
      .subscribe( customer => {
                console.log(customer);						   
           },
                    error => this.errorMessage = <any>error);
  }

  
  ngOnInit() {
    // let emailValidator = new EmailValidator(this.customerService,null);
    // let phoneNoValidator = new PhoneNoValidator(this.customerService,null);
    
    this._signupForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email],[EmailValidator.uniqueEmailValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('',Validators.pattern(this._password)),
      phoneNo: new FormControl('', [Validators.required, Validators.minLength(5)],[PhoneNoValidator.uniquePhoneNoValidator]),
      gender: new FormControl('Male'),
      dateOfBirth: new FormControl('', Validators.required)
    });

//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  next_fs = $(this).parent().next();

  //activate next step on progressbar using the index of next_fs
  $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

  //show the next fieldset
  next_fs.show();
  //hide the current fieldset with style
  current_fs.animate({ opacity: 0 }, {
    step: function (now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale current_fs down to 80%
      scale = 1 - (1 - now) * 0.2;
      //2. bring next_fs from the right(50%)
      left = (now * 50) + "%";
      //3. increase opacity of next_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({
        'transform': 'scale(' + scale + ')',
        'position': 'absolute'
      });
      next_fs.css({ 'left': left, 'opacity': opacity });
    },
    duration: 800,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

$(".previous").click(function () {
  if (animating) return false;
  animating = true;

  current_fs = $(this).parent();
  previous_fs = $(this).parent().prev();

  //de-activate current step on progressbar
  $("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");

  //show the previous fieldset
  previous_fs.show();
  //hide the current fieldset with style
  current_fs.animate({ opacity: 0 }, {
    step: function (now, mx) {
      //as the opacity of current_fs reduces to 0 - stored in "now"
      //1. scale previous_fs from 80% to 100%
      scale = 0.8 + (1 - now) * 0.2;
      //2. take current_fs to the right(50%) - from 0%
      left = ((1 - now) * 50) + "%";
      //3. increase opacity of previous_fs to 1 as it moves in
      opacity = 1 - now;
      current_fs.css({ 'left': left });
      previous_fs.css({ 'transform': 'scale(' + scale + ')', 'opacity': opacity });
    },
    duration: 800,
    complete: function () {
      current_fs.hide();
      animating = false;
    },
    //this comes from the custom easing plugin
    easing: 'easeInOutBack'
  });
});

// $(".submit").click(function () {
//   return false;
// });
    

    
  }

}
