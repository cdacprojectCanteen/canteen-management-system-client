import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import {Product} from '../pojos/Product';

@Injectable()
export class TestServiceService {

  url = "http://localhost:8080/canteenmgmtserver/Product/";
	constructor(private http:Http) { }
    getProducts(): Observable<Product[]> {
        return this.http.get(this.url)
		        .map(this.extractData)
		        .catch(this.handleErrorObservable);
    }
    private extractData(res: Response) {
	    let body = res.json();console.log(res.json());//console.log(body.);
        return body || {};
    }
    private handleErrorObservable (error: Response | any) {
    console.error(error.message || error);
		return Observable.throw(error.message || error);
    }

}
