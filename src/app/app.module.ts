import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import {LoginService} from "./services/login.service";
import {AdminService} from "./services/admin.service";
import {UserService} from "./services/user.service";
import {RegisterService} from "./services/register.service";
import {ProductService} from "./services/product.service";
import { CartService } from "./services/cart.service";
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserComponent } from './components/user/user.component';
import { ProfileComponent } from './components/user/components/profile/profile.component';
import { HomeComponent } from './components/admin/components/home/home.component';
import { AddUserComponent } from './components/admin/components/add-user/add-user.component';
import { SearchComponent } from './components/user/components/search/search.component';
import { PaymentComponent } from './components/admin/components/payment/payment.component';
import { UserdetailsComponent } from './components/admin/components/userdetails/userdetails.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeService } from './services/employee.service';
import { RegisterComponent } from './components/register/register.component';
import { ProductComponent } from './components/product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { HeaderComponent } from './components/shared/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter'; //importing the module
import { Ng2OrderModule } from 'ng2-order-pipe'; //importing the module
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FilterPipe } from './app.filter';

const appRoutes: Routes= [
 {path:"", component:ProductComponent},
  {path:"login", component:LoginComponent},
  {path:"employee", component:EmployeeComponent},
  {path:"user", component:UserComponent,children:[{path:"profile",component:ProfileComponent},{path:"search",component:SearchComponent}]},
  {path:"admin", component:AdminComponent,children:[{path:"home",component:HomeComponent},{path:"adduser",component:AddUserComponent},{path:"payment",component:PaymentComponent},{path:"userDetails",component:UserdetailsComponent}]},
  {path:"register", component:RegisterComponent},
  {path:"product", component:ProductComponent},
  {path:"cart", component:CartComponent},
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    UserComponent,
    ProfileComponent,
    HomeComponent,
    AddUserComponent,
    SearchComponent,
    PaymentComponent,
    UserdetailsComponent,
    EmployeeComponent,
    RegisterComponent,
    ProductComponent,
    CartComponent,
    HeaderComponent,
    FilterPipe,
  ],
  imports: [
    BrowserModule,
    AngularFontAwesomeModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule,
    Ng2OrderModule,
    FilterPipeModule
  ],
  providers: [LoginService,AdminService,UserService,EmployeeService,RegisterService,
  ProductService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
