import { FormControl } from '@angular/forms';
import { CustomerService } from '../services/customer.service';
import { EmployeeService } from '../services/employee.service';

export class EmailValidator{
    private static customerService: CustomerService;
    private static employeeService: EmployeeService;
    constructor(private customService: CustomerService, private employeeService: EmployeeService){
        // if(customService != null)
            EmailValidator.customerService = customService;
        // if(employeeService != null)
            EmailValidator.employeeService = employeeService;
        console.log('in constructor');
    }
    public static uniqueEmailValidator(control: FormControl) {
        const q = new Promise((resolve, reject) => {
            
            setTimeout(() => {
                if(EmailValidator.customerService != null){
                    EmailValidator.customerService.checkUniqueEmail(control.value).subscribe((result) => {
                        console.log(result);
                        if(result === true)
                            resolve(null);
                        else
                            resolve({ 'emailNotUnique': true });
                    });
                }
                else{
                    EmailValidator.employeeService.checkUniqueEmail(control.value).subscribe((result) => {
                        console.log(result);
                        if(result === true)
                            resolve(null);
                        else
                            resolve({ 'emailNotUnique': true });
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