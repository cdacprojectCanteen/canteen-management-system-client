import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Order } from '../pojos/Order';
import { Customer } from '../pojos/Customer';

const url = "http://localhost:8080/canteenmgmtserver/Order/";

@Injectable()
export class OrderService {

  constructor(private http:Http) { }

    public getOrder(id): Observable<Order>{
        return this.http.get(url+'/'+id)
        .map(this.extractData)
        .catch(this.handleErrorObservable);
    }
    
    public getOrders(): Observable<Order[]> {
        return this.http.get(url)
		        .map(this.extractData)
		        .catch(this.handleErrorObservable);
    }

    public getOrdersOf(customerId: Customer): Observable<Order[]> {
        return this.http.get(url)
		        .map(this.extractData)
		        .catch(this.handleErrorObservable);
    }

    public addOrder(customer:Order): Observable<string> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, customer, options)
                   .map(res=>res.text())
                   .catch(this.handleErrorObservable);
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
