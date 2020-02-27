import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
const httpOptions = {
  headers: new Headers({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Origin': '*'
  })
};
@Injectable()
export class ProductService {


  constructor(private http:Http) { }
  getProducts(){
    /*return this.http.get("http://localhost/blog/public/api/auth/product").map(res=>res.json());*/
    return this.http.get("http://localhost/blog/public/api/v1/product").map(res=>res.json(),httpOptions);
  }

}
