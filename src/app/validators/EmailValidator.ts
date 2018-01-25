import { FormControl } from '@angular/forms';
import { CustomerService } from '../services/customer.service';

export class EmailValidator{
    static test: string = "teststring";
    private static customerService: CustomerService
    constructor(private customService: CustomerService){
        EmailValidator.customerService = customService;
        console.log('in constructor');
    }
    public static uniqueEmailValidator(control: FormControl) {
        // this.customerService.checkUniqueEmail();
        console.log('triggered '+EmailValidator.test);
        // const myThis = this;
        // console.log('myThis: '+myThis.test);
        const q = new Promise((resolve, reject) => {
            
            setTimeout(() => {
              EmailValidator.customerService.checkUniqueEmail(control.value).subscribe((result) => {
                console.log(result);
                if(result === true)
                    resolve(null);
                else
                    resolve({ 'emailNotUnique': true });
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