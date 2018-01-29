import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Customer } from '../pojos/Customer';
import { Employee } from '../pojos/Employee';
import { CustomerService } from './customer.service';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EmployeeService } from './employee.service';

const customerUrl = "http://localhost:8080/canteenmgmtserver/Account/Customer/";
const employeeUrl = "http://localhost:8080/canteenmgmtserver/Account/Employee/";


@Injectable()
export class AccountService {
  private errorMessage: string;

  private isLoggedIn: boolean = false;
  private isEmployee: boolean = false;
  private customer: Customer;
  private employee: Employee;

  private loginChange = new BehaviorSubject<boolean>(false);
  private isEmployeeChange = new BehaviorSubject<boolean>(false);
  private customerChange = new BehaviorSubject<Customer>(null);
  private employeeChange = new BehaviorSubject<Employee>(null);
  // loginChange: Subject<boolean> = new Subject<boolean>();

  // loginObserver: Observer<boolean>;
  // loginObservable = new Observable((observer: Observer<boolean>) => {
  //   this.loginObserver = observer;
  // });

  constructor(private http: Http, private customerService: CustomerService, private employeeService: EmployeeService) { 
    // this.loginObservable.subscribe(loggedIn =>{this.isLoggedIn = loggedIn; console.log('updated loggedIn value');});
    this.loginChange.subscribe(loggedIn =>{this.isLoggedIn = loggedIn; console.log('updated loggedIn value');});
    this.isEmployeeChange.subscribe(isEmployee =>{this.isEmployee = isEmployee; console.log('updated isEmployee value');});
    this.customerChange.subscribe(customer =>{this.customer = customer; console.log('updated customer value');});
    this.employeeChange.subscribe(employee =>{this.employee = employee; console.log('updated employee value');});
  }

  // public getCustomers(): Observable<Customer[]> {
  //     return this.http.get(url)
  //         .map(this.extractData)
  //         .catch(this.handleErrorObservable);
  // }

  public restoreLoginState() {
    console.log('Restoring login state');
    if (localStorage.getItem('isLoggedIn') == 'true') {
      // console.log('Login exists');
      // this.isLoggedIn = true;
      // this.loginObserver.next(true);
      this.loginChange.next(true);
      if (localStorage.getItem('isEmployee') == 'true') {
        // console.log('Is Employee');
        this.isEmployeeChange.next(true);
        this.employeeService
          .getEmployee(parseInt(localStorage.getItem('employee')))
          .subscribe(employee => {
            // console.log('got employee');
            // console.log(employee);
            this.employeeChange.next(employee);
          });
      }
      else {
        // console.log('Is Customer');
        this.customerService
          .getCustomer(parseInt(localStorage.getItem('customer')))
          .subscribe(customer => {
            // console.log('got customer');
            // console.log(customer);
            this.customerChange.next(customer);
          });
      }
    }
    else {
      // console.log('login state does not exist');
    }
  }

  private customerLogin(username: string, password: string): Observable<Customer> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    var body = 'username=' + username + '&password=' + password;
    return this.http.post(customerUrl, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  public doCustomerLogin(username: string, password: string): BehaviorSubject<boolean> {
    this.customerLogin(username, password).subscribe(customer => {
      // console.log(customer);
      // console.log("ID: " + customer.id);
      if (customer === null || customer === undefined || customer.id === -1) {
        // console.log("Invalid Customer");
        // console.log(customer);
        // this.loginObserver.next(false);
        this.loginChange.next(false);
      }
      else {
        // console.log("Valid Customer");
        // this.isLoggedIn = true;
        this.customerChange.next(customer);

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('customer', customer.id.toString());

        // window.location.reload();
        // this.loginObserver.next(true);
        this.loginChange.next(true);
      }
    },
      error => this.errorMessage = <any>error);
    // return this.loginObservable;
    return this.loginChange;
  }

  private employeeLogin(username: string, password: string): Observable<Employee> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    var body = 'username=' + username + '&password=' + password;
    return this.http.post(employeeUrl, body, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  public doEmployeeLogin(username: string, password: string) : BehaviorSubject<boolean>{
    this.employeeLogin(username, password).subscribe(employee => {
      // console.log(employee);
      // console.log("ID: " + employee.id);
      if (employee === null || employee === undefined || employee.id === -1) {
        // console.log("Invalid Employee");
        // console.log(employee);
        // this.loginObserver.next(false);
        this.loginChange.next(false);
      }
      else {
        // console.log("Valid Employee");
        // this.isLoggedIn = true;
        this.employeeChange.next(employee)
        this.isEmployeeChange.next(true);

        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('employee', employee.id.toString());
        localStorage.setItem('isEmployee', 'true');
        // this.loginObserver.next(true);
        this.loginChange.next(true);
      }
    },
      error => this.errorMessage = <any>error);

      return this.loginChange;
  }

  public doLogout() {
    // this.isLoggedIn = false;
    // this.loginObserver.next(false);
    this.loginChange.next(false);
    this.isEmployeeChange.next(false);
    this.isEmployeeChange.next(false);
    this.customerChange.next(null);

    localStorage.clear();

    // localStorage.removeItem('isLoggedIn');
    // localStorage.removeItem('customer');
    // localStorage.removeItem('employee');
    // localStorage.removeItem('isLoggedIn');
  }

  public IsLoggedIn(): BehaviorSubject<boolean> {
    // return this.loginObservable;
    return this.loginChange;
  }

  public IsEmployee(): BehaviorSubject<boolean> {
    return this.isEmployeeChange;
  }

  // public IsCustomer(): boolean {
  //   return !this.isEmployee && this.isLoggedIn;
  // }

  public getCustomer(): BehaviorSubject<Customer> {
    return this.customerChange;
  }

  public getEmployee(): BehaviorSubject<Employee> {
    return this.employeeChange;
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }
  private handleErrorObservable(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.message || error);
  }

}
