import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { datetimesettings } from '../utils/utils';
import { ActivatedRoute } from '@angular/router';

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

  existing: boolean;
  editMode: boolean ;

  datetimesettings: any  = datetimesettings;

  constructor(private bookingService: BookingService, private route: ActivatedRoute) {
    this.makebooking$ = this.bookingService.makeBooking(this.booking).pipe(tap(() => this.loading = false));
  }


  ngOnInit() {

    this.titles = ['Miss', 'Mr', 'Mrs', 'Ms', 'Prof', 'Rev', 'Sir'];
    this.route.queryParams.subscribe((params) => {
      if (!!params['action'] && params['action'] === 'checkout' ) {
        this.booking = this.bookingService.selectedBooking;
        this.existing = true;
        this.editMode = true;
        console.log(`booking: ${this.booking}`);
      } else {
        this.existing = false;
        this.editMode = true;
        this.initBooking();
      }
  });
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
    console.log('data' + JSON.stringify(this.booking));
    this.alert = null;
    this.loading = true;
    this.makebooking$.subscribe( resp => {
      const booking: Booking = resp;
      alert('Booking Captured!');
      this.alert = {type: 'success', message: 'Booking Done! \n* Booking number: ' + booking.vehicleId + '\n* Duration: ' + booking.duration};
      this.initBooking();
    },
    error => {
      alert('Something went wrong please try again later!');
      this.alert = {type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error.error) + '`'};
      console.log('error:' + JSON.stringify(error));
  });
  }
}
