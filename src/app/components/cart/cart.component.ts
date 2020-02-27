import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";
import { ToastrManager } from 'ng6-toastr-notifications';
import { resolve } from 'q';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  constructor(private cartService:CartService,private router:Router,public toastr: ToastrManager) {
  	
  }

  ngOnInit() {
  
  }
  
  callRoute(z) {
    this.router.navigate(['/'+z]);
    setTimeout( () => {
      this.router.navigate([z]);
    }, 1);
  }

 checkout(){
  console.log(this.cartService.items.length);
  if(this.cartService.items.length > 0){
    this.cartService.checkout().subscribe(users=>{
      if(users.message==1){
        this.router.navigate(['/login']);
      }else{
        this.cartService.clearItems();
        this.showWarning(users.message);
      }
    })
  }else{
    this.showWarning("Your Cart is empty");
  }
}
showWarning(message){
  this.toastr.infoToastr(message, 'Info!');
}
}
