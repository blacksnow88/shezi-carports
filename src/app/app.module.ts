import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewbookingComponent } from './newbooking/newbooking.component';
import { ViewbookingsComponent } from './viewbookings/viewbookings.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { RouterModule, Routes } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NewreservationComponent } from './newreservation/newreservation.component';
import { ViewreservationsComponent } from './viewreservations/viewreservations.component';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';

const appRoutes: Routes = [
  { path: 'new/reservation', component: NewreservationComponent },
  { path: 'new/booking', component: NewbookingComponent },
  { path: 'view/bookings',      component: ViewbookingsComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewbookingComponent,
    ViewbookingsComponent,
    PagenotfoundComponent,
    NewreservationComponent,
    ViewreservationsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    AngularDateTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
