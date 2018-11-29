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
import { InfomodalComponent } from './infomodal/infomodal.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    NewbookingComponent,
    ViewbookingsComponent,
    PagenotfoundComponent,
    NewreservationComponent,
    ViewreservationsComponent,
    InfomodalComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    AngularDateTimePickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
