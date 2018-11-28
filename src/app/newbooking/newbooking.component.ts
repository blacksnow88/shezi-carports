import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { datetimesettings } from '../utils/utils';

@Component({
  selector: 'app-newbooking',
  templateUrl: './newbooking.component.html',
  styleUrls: ['./newbooking.component.scss']
})
export class NewbookingComponent implements OnInit {

  booking: Booking;
  titles: string[];
  alert: any;
  loading: boolean;
  makebooking$: Observable<any>;
  _totalHours: number;
  _randValue: number;
  customerExists: boolean;

  datetimesettings: any  = datetimesettings;

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
    this.initBooking();
  }

  close(alert: any) {
    this.alert = null;
  }

  private initBooking(): void {
    this.booking = new Booking();
    const dateToday = new Date();
    const dateTomorow = new Date();
    this.booking.checkIn = this.dateToString(dateToday);
    dateTomorow.setDate(dateTomorow.getDate() + 1);
    this.booking.checkout = this.dateToString(dateTomorow);
  }

  private dateToString(date: Date): string {
    const day = date.getDate();
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const munites = date.getMinutes();
    const datestr = `${year}-${monthIndex < 10 ?  '0' + monthIndex : monthIndex}-${day < 10 ?  '0' + day : day}T${hours < 10 ?  '0' + hours : hours}:${munites < 10 ?  '0' + munites : munites}`;
    console.log(datestr);
    return datestr;
  }

  onSubmit() {
    this.alert = null;
    this.loading = true;
    this.makebooking$.subscribe( resp => {
      const booking: Booking = resp;
      this.alert = {type: 'success', message: 'Booking Done! \n* Booking number: ' + booking.vehicleId + '\n* Duration: ' + booking.duration};
      this.initBooking();
    },
    error => {
      this.alert = {type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error.error) + '`'};
      console.log('erro:' + JSON.stringify(error));
  });
  }
}
