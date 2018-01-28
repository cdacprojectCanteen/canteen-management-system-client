import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Category } from '../pojos/Category';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

const url = "http://localhost:8080/canteenmgmtserver/Category/";

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  public getCategories(): Observable<Category[]> {
    return this.http.get(url)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }

  addCategory(category: Category): Observable<number> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(url, category, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  updateCategory(category: Category): Observable<Category> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    let options = new RequestOptions({ headers: headers });
    return this.http.put(url, category, options)
      .map(this.extractData)
      .catch(this.handleErrorObservable);
  }
  deleteCategory(categoryId: number): Observable<Category> {
    return this.http.delete(url+categoryId)
		        .map(this.extractData)
		        .catch(this.handleErrorObservable);
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
