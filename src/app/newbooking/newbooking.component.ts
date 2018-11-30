import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { datetimesettings, deepCopy } from '../utils/utils';
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
  checkout$: Observable<any>;

  existing: boolean;
  editMode: boolean ;

  datetimesettings: any  = datetimesettings;

  constructor(private bookingService: BookingService, private route: ActivatedRoute) {
  }


  ngOnInit() {

    this.titles = ['Miss', 'Mr', 'Mrs', 'Ms', 'Prof', 'Rev', 'Sir'];
    this.route.queryParams.subscribe((params) => {
      if (!!params['action'] && params['action'] === 'checkout' && !!this.bookingService.selectedBooking) {
        this.booking = deepCopy(this.bookingService.selectedBooking);
        this.bookingService.selectedBooking = null;
        this.existing = true;
        this.editMode = false;
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
    console.log('book data' + JSON.stringify(this.booking));
    this.alert = null;
    this.loading = true;
    this.bookingService.makeBooking(this.booking).subscribe(resp => {
      this.loading = false;
      const booking: Booking = resp.body;
      alert('Booking Captured!');
      this.alert = { type: 'success', message: 'Booking Done! \n* Booking number: ' + booking.vehicleId + '\n* Duration: ' + booking.duration };
      this.initBooking();
    },
      error => {
        this.loading = false;
        alert('Something went wrong please try again later!');
        this.alert = { type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error.error) + '`' };
        console.log('error:' + JSON.stringify(error));
      });
  }

  checkOut() {
    const ans = confirm('Are you sure you want to check out?');
    if (ans === true) {
      console.log('checkout data' + JSON.stringify(this.booking));
      this.alert = null;
      this.loading = true;
      this.bookingService.checkoutBooking(this.booking.bookingId).subscribe(resp => {
        alert('Checkout Complete, see details!');
        this.alert = { type: 'success', message: 'Checkout Complete! \n DAYS: ' + resp.days + '\n HOURS:' + resp.hours + '\n PRICE: R ' + resp.price  };
        this.booking.isComplete = true;
        //this.initBooking();
      },
        error => {
          alert('Something went wrong please try again later!');
          this.alert = { type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error.error) + '`' };
          console.log('error:' + JSON.stringify(error));
        });
    }
  }

  updateBooking() {
    console.log('book data' + JSON.stringify(this.booking));
    this.alert = null;
    this.loading = true;
    this.bookingService.updateBooking(this.booking).subscribe(resp => {
      this.loading = false;
      const booking: Booking = resp.body;
      alert('Booking Updated!');
      this.alert = { type: 'success', message: 'Booking Updated! \n* Booking number: ' + booking.vehicleId + '\n* Duration: ' + booking.duration };
      this.initBooking();
    },
      error => {
        this.loading = false;
        alert('Something went wrong please try again later!');
        this.alert = { type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error.error) + '`' };
        console.log('error:' + JSON.stringify(error));
      });
  }
}
