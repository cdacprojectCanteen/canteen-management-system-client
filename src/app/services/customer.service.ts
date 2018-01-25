import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Customer} from '../pojos/Customer';

const url = "http://localhost:8080/canteenmgmtserver/Customer/";

@Injectable()
export class CustomerService {

  constructor(private http:Http) { }

    public getCustomer(id): Observable<Customer>{
        return this.http.get(url+'/'+id)
        .map(this.extractData)
        .catch(this.handleErrorObservable);
    }
    
    public getCustomers(): Observable<Customer[]> {
        return this.http.get(url)
		        .map(this.extractData)
		        .catch(this.handleErrorObservable);
    }
    public addCustomer(customer:Customer): Observable<Customer> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, customer, options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
    }
    
    public checkUniqueEmail(email: string){
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url+'IsUniqueEmail',email,options)
		        .map(this.extractData).catch(this.handleErrorObservable);
    }

    public checkUniquePhoneNo(phoneNo: string){
        let headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url+'IsUniquePhoneNo',phoneNo,options)
		        .map(this.extractData).catch(this.handleErrorObservable);
    }
    
    private extractData(res: Response) {
	    let body = res.json();
        return body || {};
    }
    private handleErrorObservable (error: Response | any) {
        console.error(error.message || error);
		return Observable.throw(error.message || error);
    }

}
