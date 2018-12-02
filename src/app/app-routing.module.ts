import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewreservationComponent } from './views/newreservation/newreservation.component';
import { ViewbookingsComponent } from './views/viewbookings/viewbookings.component';
import { CustomersComponent } from './views/customers/customers.component';


const routes: Routes = [
  { path: 'new/reservation', component: NewreservationComponent },
  // { path: 'view/booking', component: NewbookingComponent },
  { path: 'view/bookings',      component: ViewbookingsComponent },
  { path: 'view/customers',      component: CustomersComponent },
  { path: '**', component: NewreservationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
