import { FormControl } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

export class PhoneNoValidator{
    static test: string = "teststring";
    private static customerService: CustomerService
    constructor(private customService: CustomerService){
        PhoneNoValidator.customerService = customService;
        console.log('in constructor');
    }
    public static uniquePhoneValidator(control: FormControl) {
        console.log('triggered '+PhoneNoValidator.test);
        // const myThis = this;
        // console.log('myThis: '+myThis.test);
        const q = new Promise((resolve, reject) => {
            
            setTimeout(() => {
              PhoneNoValidator.customerService.checkUniquePhoneNo(control.value).subscribe((result) => {
                console.log(result);
                if(result === true)
                    resolve(null);
                else
                    resolve({ 'phoneNoNotUnique': true });
              });
            }, 1000);
          });
          return q;
    }

    private static handleErrorPromise (error: Response | any) {
		console.error(error.message || error);
		return Promise.reject(error.message || error);
    }	
}