import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewbookingsComponent } from './views/viewbookings/viewbookings.component';
import { CustomersComponent } from './views/customers/customers.component';
import { UserLoginComponent } from './views/user-login/user-login.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './views/newreservation/home.component';


const routes: Routes = [
  { path: 'view/bookings',      component: ViewbookingsComponent, canActivate: [AuthGuard]  },
  { path: 'view/customers',      component: CustomersComponent,  canActivate: [AuthGuard]},
  { path: 'home',      component: HomeComponent,  canActivate: [AuthGuard]},
  { path: 'login', component: UserLoginComponent },
  { path: '**', component: UserLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
