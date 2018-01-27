import { FormControl } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { EmployeeService } from '../services/employee.service';

export class PhoneNoValidator{
    private static customerService: CustomerService;
    private static employeeService: EmployeeService;
    constructor(private customService: CustomerService, private employeeService: EmployeeService){
        // if(customService != null)
            PhoneNoValidator.customerService = customService;
        // if(employeeService != null)
            PhoneNoValidator.employeeService = employeeService;
        console.log('in constructor');
    }
    public static uniquePhoneNoValidator(control: FormControl) {
        const q = new Promise((resolve, reject) => {
            
            setTimeout(() => {
                if(PhoneNoValidator.customerService != null){
                    PhoneNoValidator.customerService.checkUniquePhoneNo(control.value).subscribe((result) => {
                        console.log(result);
                        if(result === true)
                            resolve(null);
                        else
                            resolve({ 'phoneNoNotUnique': true });
                    });
                }
                else{
                    PhoneNoValidator.employeeService.checkUniquePhoneNo(control.value).subscribe((result) => {
                        console.log(result);
                        if(result === true)
                            resolve(null);
                        else
                            resolve({ 'phoneNoNotUnique': true });
                    });
                }
            }, 1000);
          });
          return q;
    }

    private static handleErrorPromise (error: Response | any) {
		console.error(error.message || error);
		return Promise.reject(error.message || error);
    }	
}