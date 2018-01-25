import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Product} from '../pojos/Product';

const url = "http://localhost:8080/canteenmgmtserver/Product/";

@Injectable()
export class ProductService {
  
	constructor(private http:Http) { }
    
    public getProducts(): Observable<Product[]> {
        return this.http.get(url)
		        .map(this.extractData)
		        .catch(this.handleErrorObservable);
    }
    addProduct(product:Product): Observable<Product> {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Access-Control-Allow-Origin', '*');
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, product, options)
                   .map(this.extractData)
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
