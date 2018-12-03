import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewbookingsComponent } from './views/viewbookings/viewbookings.component';
import { CustomersComponent } from './views/customers/customers.component';
import { UserLoginComponent } from './views/user-login/user-login.component';


const routes: Routes = [
  { path: 'view/bookings',      component: ViewbookingsComponent },
  { path: 'view/customers',      component: CustomersComponent },
  { path: 'login', component: UserLoginComponent },
  { path: '**', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
