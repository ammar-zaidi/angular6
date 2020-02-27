import { Injectable } from '@angular/core';
import { Http, Response, Headers } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";


@Injectable()
export class CartService {
    public cartName = 'AffiliateMarketingCart';
    public clearCart = false;
    public items = [];
    public cart = [];
    public total = "";


    productname: string;
    sku: any;
    unitprice: any;
    quantity: any;
    faux: Boolean;
    public data1 = [];
    public total1 = 0;

    constructor(private http: Http) {
        this.loadItems();

        // console.log(this.loadItems());
        // console.log(this.items.length);
    }
    /*// adds an item to the cart
        addItem(product) {
            const _return = true;
            console.log(product);
        }*/
    getcart() {
        // return this.coins;
    }
    /*  addItem(product){
    console.log();
        if (this.cart.length === 0){
                    product.count = 1;
                    this.cart.push(product);
                } else {
                    var repeat = false;
                    for(var i = 0; i< this.cart.length; i++){
                        if(this.cart[i].id === product.id){
                            repeat = true;
                            this.cart[i].count +=1;
                        }
                    }
                    if (!repeat) {
                        product.count = 1;
                        this.cart.push(product);    
                    }
                }
    console.log(this.cart);
    this.saveItems()
        
      }*/

    // adds an item to the cart
    addItem(productid, productname, unitprice, quantity, faux) {
        console.log(faux);
        // console.log(items);
        const _return = true;
        if (!faux) {
            let found = false;
            console.log(this.items.length);
            for (let i = 0; i < this.items.length && !found; i++) {
                const item = this.items[i];
                if (item.sku === productid) {
                    found = true;
                    item.quantity = this.toNumber(item.quantity + quantity);
                    if (item.quantity <= 0) {
                        this.items.splice(i, 1);
                    }
                }
            }
            // if item wasn't already in cart, add it now
            if (!found) {
                const item = new this.cartItem(productid, productname, unitprice, quantity, faux);
                this.items.push(item);
            }

            // save changes
            this.saveItems();

        } else {
            alert('This product is shown for demonstration purposes only!');
        }
        return _return;
    }
    // items in the cart
    //
    cartItem(sku, productname, unitprice, quantity, faux) {
        this.sku = sku;
        this.productname = productname;
        this.unitprice = unitprice * 1;

        this.quantity = quantity * 1;
        this.faux = faux;

    }


    // save items to local storage
    saveItems() {

        if (localStorage != null && JSON != null) {
            localStorage[this.cartName + '_items'] = JSON.stringify(this.items);
        }
    }


    // load items from local storage
    loadItems() {

        let items = localStorage != null ? localStorage[this.cartName + '_items'] : null;
        if (items != null && JSON != null) {
            try {
                items = JSON.parse(items);
                for (let i = 0; i < items.length; i++) {
                    let item = items[i];
                    if (item.sku != null && item.productname != null &&
                        item.unitprice != null && item.quantity != null &&
                        item.faux != null) {
                        item = new this.cartItem(item.sku, item.productname, item.unitprice,
                            item.quantity, item.faux);
                        this.items.push(item);
                    }
                }
            } catch (err) {
                // ignore errors while loading...
            }
        }
        return items;
    }


    // get the total price for all items currently in the cart
    getTotalCount(sku) {
        //console.log("ammar"+sku);
        let count: any;
        count = 0;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (sku === null || item.sku === sku) {
                count += this.toNumber(item.quantity);
            }
        }
        return count;
    }
    // get the total price for all items currently in the cart
    getTotalPrice(sku) {

        let total: any;
        total = 0;
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            if (sku === null || item.sku === sku) {
                if (item.showsale) {
                    total += this.toNumber(item.quantity * item.saleprice);
                } else {
                    total += this.toNumber(item.quantity * item.unitprice);
                }
            }

        }
        return total;

    }
    // get the total shipping & handling for all items currently in the cart
    // You can customize this any way you want.
    // Here I decided to charge whatever the max sh is for the items in the cart
    getTotalSH(sku) {
        const myArray = [];
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            // alert(this.toNumber(item.sh));
            if (sku === null || item.sku === sku) {
                // alert(this.toNumber(item.sh));
                myArray.push(this.toNumber(item.sh));
            }
        }
        if (myArray.length < 1) {
            return undefined;
        } else {
            return Math.max.apply(Math, myArray);

        }
        //return 1;
    }
    // ----------------------------------------------------------------
    // items in the cart
    //

    toNumber(value) {
        const num: any = this.stripNonNumeric(value);
        value = num * 1;
        return isNaN(value) ? 0 : value;
    }
    stripNonNumeric(str) {
        str += '';
        const rgx = /^d|.|-$/;
        let out = '';
        for (let i = 0; i < str.length; i++) {
            if (rgx.test(str.charAt(i))) {
                if (!((str.charAt(i) === '.' && out.indexOf('.') !== -1) ||
                        (str.charAt(i) === '-' && out.length !== 0))) {
                    out += str.charAt(i);
                }
            }
        }
        return out;
    }
    // clear the cart
    clearItems() {
        this.items = [];
        this.saveItems();
    }
   


    checkout() {
        this.data1 = this.items;

        this.total = this.getTotalPrice(null);
        console.log(this.total);
        var headers = new Headers();
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', window.localStorage.getItem("auth-key"));
        //  const requestOptions = new RequestOptions({ headers: headers });


        return this.http.post("http://localhost/blog/public/api/v1/cart", {
            'data': this.data1,
            'total': this.total
        }, {
            headers: headers
        }).map(res => res.json());


        /*this.http.post("http://localhost/blog/public/api/v1/cart", {'data': this.data1,'total':this.total}, {headers: headers})
          .subscribe(data => {
            console.log(data);
            this.showWarning();
           }, error => {
            console.log(error);
          });*/
    }

}
