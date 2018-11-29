import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewreservationComponent } from './newreservation/newreservation.component';
import { NewbookingComponent } from './newbooking/newbooking.component';
import { ViewbookingsComponent } from './viewbookings/viewbookings.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: 'new/reservation', component: NewreservationComponent },
  { path: 'new/booking', component: NewbookingComponent },
  { path: 'view/booking', component: NewbookingComponent },
  { path: 'view/bookings',      component: ViewbookingsComponent },
  { path: '**', component: NewreservationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
