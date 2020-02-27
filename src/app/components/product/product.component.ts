import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductService } from "../../services/product.service";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";
import { Pipe, PipeTransform } from '@angular/core';
import { FilterPipe }from '../../app.filter';
import { resolve } from 'q';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
	products:Product[];


   //sorting
  key: string = 'product_name'; //set default
  reverse: boolean = true;
 

name:string;

  constructor(private router:Router,private productService:ProductService,
  	private cartService:CartService) {
    this.getProducts();
    //console.log(this.cartService.getcart());
   }

  ngOnInit() {
  }
  getProducts(){
  	console.log("dssd");
    this.productService.getProducts().subscribe(products=>{
    	console.log(products);
      this.products=products;
    });
  }
  addtocart(product){
  	console.log(product);
   
  }
  callRoute(z) {
  
   // event.preventDefault();

    this.router.navigate(['/'+z]);
    setTimeout( () => {
        // this.navbarrouter.navigate(['/browser', {name: browserRef, url: pathRef}]);
        this.router.navigate([z]);
    }, 1);
  }

   sort(key){
    console.log(key);
    this.key = key;
    this.reverse = !this.reverse;
     console.log(this.reverse);
    
  }

}
interface Product{
  product_name:string;
  product_code:string,
  description:string,
  price:string
 
}