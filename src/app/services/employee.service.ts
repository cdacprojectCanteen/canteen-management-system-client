import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Employee} from '../pojos/Employee';

const url = "http://localhost:8080/canteenmgmtserver/Employee/";

@Injectable()
export class EmployeeService {

  constructor(private http:Http) { }

    public getEmployee(id): Observable<Employee>{
        return this.http.get(url+id)
        .map(this.extractData)
        .catch(this.handleErrorObservable);
    }
    
    public getEmployees(): Observable<Employee[]> {
        return this.http.get(url)
		        .map(this.extractData)
		        .catch(this.handleErrorObservable);
    }
    public addEmployee(employee:Employee): Observable<Employee> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, employee, options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
    }

    public updatePassword(id: number, oldPassword: string, newPassword: string){
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.put(url+'UpdatePassword/'+id, {'oldPassword':oldPassword,'newPassword':newPassword},options)
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
