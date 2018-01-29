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
    
    public getProduct(productId:number): Observable<Product> {
        return this.http.get(url+productId)
		        .map(this.extractData)
		        .catch(this.handleErrorObservable);
    }
    
    public getProducts(): Observable<Product[]> {
        return this.http.get(url)
		        .map(this.extractData)
		        .catch(this.handleErrorObservable);
    }
    addProduct(product:Product, fileToUpload:any): Observable<number> {
        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Content-Type','multipart/form-data');
        headers.append('Access-Control-Allow-Origin', '*');

        let formData:FormData = new FormData();
        // formData.append('productPicUrl', files[0], files[0].name);
        if(fileToUpload == null)
            formData.append('file', new Blob(), '');
        else
            formData.append('file', fileToUpload, fileToUpload.name);

        formData.append('json', new Blob([JSON.stringify(product)], {
            type: "application/json"
        }));

        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, formData, options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
    }

    updateProduct(product:Product, fileToUpload:any): Observable<Product> {
        let headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        // headers.append('Content-Type','multipart/form-data');
        headers.append('Access-Control-Allow-Origin', '*');

        let formData:FormData = new FormData();
        // formData.append('productPicUrl', files[0], files[0].name);
        if(fileToUpload == null)
            formData.append('file', new Blob(), '');
        else
            formData.append('file', fileToUpload, fileToUpload.name);

        formData.append('json', new Blob([JSON.stringify(product)], {
            type: "application/json"
        }));

        let options = new RequestOptions({ headers: headers });
        return this.http.put(url, formData, options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
    }
    
    public deleteProduct(productId:number): Observable<Product[]> {
        return this.http.delete(url+productId)
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
