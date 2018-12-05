import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule, NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerModule, NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiModule, Configuration } from './Api_Module';
import { NavbarComponent } from './views/navbar/navbar.component';
import { ViewbookingsComponent } from './views/viewbookings/viewbookings.component';
import { PagenotfoundComponent } from './views/pagenotfound/pagenotfound.component';
import { ViewreservationsComponent } from './views/viewreservations/viewreservations.component';
import { CustomersComponent } from './views/customers/customers.component';
import { VehicleDetailsComponent } from './views/vehicle-details/vehicle-details.component';
import { NewCustomerDetailsComponent } from './views/new-customer-details/new-customer-details.component';
import { CreateCustomerModalComponent } from './views/createCustomerModal/create-customer-modal.component';
import { CreateBookingModalComponent } from './views/createBookingModal/create-booking-modal.component';
import { CheckOutBookingModalComponent } from './views/checkOutBookingModal/checkout-booking-modal.component';
import { UserLoginComponent } from './views/user-login/user-login.component';
import { HomeComponent } from './views/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { JwtInterceptor } from './Api_Module/interceptors/jwt.interceptor';
import { ErrorInterceptor } from './Api_Module/interceptors/error.interceptor';
import { environment } from '../environments/environment';
import { SearchbookingsComponent } from './views/searchbookings/searchbookings.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CreateBookingModalComponent,
    ViewbookingsComponent,
    PagenotfoundComponent,
    UserLoginComponent,
    ViewreservationsComponent,
    CreateCustomerModalComponent,
    CustomersComponent,
    VehicleDetailsComponent,
    NewCustomerDetailsComponent,
    CheckOutBookingModalComponent,
    UserLoginComponent,
    HomeComponent,
    SearchbookingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ApiModule.forRoot(getApiConfig),
    NgbModule,
    NgbDatepickerModule,
    NgbTimepickerModule,
    NgxDatatableModule
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}, AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export const apiConfig = new Configuration({
  basePath: environment.apiBase,
  withCredentials: false
});
export function getApiConfig() {
  return apiConfig;
}
