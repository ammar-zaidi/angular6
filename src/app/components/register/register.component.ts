import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterService } from "../../services/register.service";
import { Router } from "@angular/router";
import { resolve } from 'q';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	  signupForm:FormGroup;
  
  password_signup:string;
  firstname_signup:string;
  lastname_signup:string;
  email_signup:string;
  postal_address_signup:string;
  physical_address_signup:string;
 

  
  post:any;
  error:boolean=false;
  error_message:string="";

  titleAlert:string = 'This Field is Required';


  constructor(private registerService:RegisterService, private router:Router, private formBuilder:FormBuilder) { 
    
    this.firstname_signup="";
    this.lastname_signup="";
    this.email_signup="";
    this.password_signup="";
    this.postal_address_signup="";
    this.physical_address_signup="";
    
    
    this.signupForm=formBuilder.group({
       
        "firstname_signup":[null,Validators.required],
        "lastname_signup":[null,Validators.required],
        "email_signup":[null,Validators.required],
        "password_signup":[null,Validators.required],
        "postal_address_signup":[null,Validators.required],
        "physical_address_signup":[null,Validators.required],
        
    });
}

  ngOnInit() {
  }
  signup(post){
  	console.log(post);
    
      this.firstname_signup=post.firstname_signup;
      this.lastname_signup=post.lastname_signup;
      this.email_signup=post.email_signup;
      this.password_signup=post.password_signup;
      this.physical_address_signup=post.physical_address_signup;
      this.postal_address_signup=post.postal_address_signup;
      
     
     this.registerService.signup(
     	this.firstname_signup,
     	this.lastname_signup,
     	this.email_signup,
     	this.password_signup,
     	this.physical_address_signup,
     	this.postal_address_signup).subscribe(
          res=>{
            this.error=!this.error;
            this.error_message="User Created Successfully";
            console.log(res);
          },
          error=>{
            this.error=!this.error;
            this.error_message="There is an Error in the data You Input";
            console.log(this.error_message);
          }
      );
  }

}
