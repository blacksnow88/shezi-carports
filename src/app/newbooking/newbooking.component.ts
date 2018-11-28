import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrls: ['./newbooking.component.scss']
})
export class NewbookingComponent implements OnInit {

  booking: Booking = new Booking();
  titles: string[];
  alert: any;
  loading: boolean;
  makebooking$: Observable<any>;
  _totalHours: number;
  _randValue: number;

  constructor(private bookingService: BookingService) {
    this.makebooking$ = this.bookingService.makeBooking(this.booking).pipe(tap(() => this.loading = false));
  }
  randValue(): number {
    return this.totalHours() * 190;
  }

  totalHours(): number {
    if (!!this.booking.checkout && !!this.booking.checkIn) {
      const checkOut = new Date(this.booking.checkout);
      const checkIn = new Date(this.booking.checkIn);
      const timeDiff  = checkOut.getTime() - checkIn.getTime();
      console.log('tm:' + timeDiff);
      return Math.ceil(timeDiff / (1000 * 3600));
    }
   return 0;
  }

  ngOnInit() {
    this.titles = ['Miss', 'Mr', 'Mrs', 'Ms', 'Prof', 'Rev', 'Sir'];
  }

  onSubmit() {
    this.alert = null;
    this.loading = true;
    this.makebooking$.subscribe( resp => {
      const booking: Booking = JSON.parse(resp.body);
      this.alert = {type: 'sucess', message: ('You booking was successful!, Booking number: ' + booking.vehicleId)};
      this.booking = new Booking();
    },
    error => {
      this.alert = {type: 'danger', message: 'Something went wrong please try again later.'};
      console.log('erro:' + JSON.stringify(error));
  });
  }
}
