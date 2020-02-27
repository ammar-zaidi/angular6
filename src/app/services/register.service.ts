import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";


@Injectable()
export class RegisterService {

  constructor(private http:Http) { }
signup(firstname,
	lastname,
	email,
	password,
	physical_address,
	postal_address
	){
	  var headers= new Headers();
    headers.append('Content-Type','application/X-www-form=urlencoded');
    return this.http.post("http://localhost/blog/public/api/v1/register",
    	{"firstname":firstname,"lastname":lastname,
    	"password":password,
    	"physical_add":physical_address,
    	"postal_address":postal_address,
    	"email":email}).map(res=>res.json());
  }

}
