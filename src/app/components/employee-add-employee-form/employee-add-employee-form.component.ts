import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder } from '@angular/forms';
import { Employee } from '../../pojos/Employee';
import { EmployeeService } from '../../services/employee.service';
import { EmailValidator } from '../../validators/EmailValidator';
import { PhoneNoValidator } from '../../validators/PhoneNoValidator';
import { AccountService } from '../../services/account.service';
import { UpdateProductChannelService } from '../../services/update-product-channel.service';
import { Product } from '../../pojos/Product';
declare var $: any;


@Component({
  selector: 'app-employee-add-employee-form',
  templateUrl: './employee-add-employee-form.component.html',
  styleUrls: ['./employee-add-employee-form.component.css']
})
export class EmployeeAddEmployeeFormComponent implements OnInit {

  private errorMessage: string;

  private _profilePicUrl: string;
  private _addEmployeeForm: FormGroup;
  private _password: string;
  private _confirmPassword: string;

  constructor(private employeeService: EmployeeService, private accountService: AccountService) { 
    this._profilePicUrl = "../../../assets/images/user_male.png";
    
  }

  onSubmit(){

    if(
      this._addEmployeeForm.controls.firstName.valid
                          &&
      this._addEmployeeForm.controls.email.valid
                          &&
      this._addEmployeeForm.controls.password.valid
                          &&
      this._addEmployeeForm.controls.phoneNo.valid
                          &&
      this._addEmployeeForm.controls.gender.valid
                          &&
      this._addEmployeeForm.controls.dateOfBirth.valid
    ){

        let employee = new Employee();
        employee.firstName = this._addEmployeeForm.controls.firstName.value;
        employee.lastName = this._addEmployeeForm.controls.lastName.value;
        employee.email = this._addEmployeeForm.controls.email.value;
        employee.passHash = this._addEmployeeForm.controls.password.value;
        employee.phoneNo = this._addEmployeeForm.controls.phoneNo.value;
        employee.gender = this._addEmployeeForm.controls.gender.value;
        employee.dateOfBirth = this._addEmployeeForm.controls.dateOfBirth.value;
        employee.dateOfJoining = new Date();
        console.log(employee);
        this.addEmployee(employee);
        $('#addEmployeeModal').modal('hide');
    }
    else{
      
    }
  }
  

  addEmployee(employee: Employee): void {
    this.employeeService.addEmployee(employee)
      .subscribe( employee => {
                console.log(employee);						   
           },
                    error => this.errorMessage = <any>error);
  }

  
  ngOnInit() {
    let emailValidator = new EmailValidator(null,this.employeeService);
    let phoneNoValidator = new PhoneNoValidator(null,this.employeeService);
    
    this._addEmployeeForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lastName: new FormControl(),
      email: new FormControl('', [Validators.required, Validators.email],[EmailValidator.uniqueEmailValidator]),
      password: new FormControl('', [Validators.required, Validators.minLength(3)]),
      confirmPassword: new FormControl('',Validators.pattern(this._password)),
      phoneNo: new FormControl('', [Validators.required, Validators.minLength(5)],[PhoneNoValidator.uniquePhoneNoValidator]),
      gender: new FormControl('Male'),
      dateOfBirth: new FormControl('', Validators.required),
      userProfilePic : new FormControl()
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
