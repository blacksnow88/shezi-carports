import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BookingModel, BookingService } from 'src/app/Api_Module';
import { MediatorService } from 'src/app/services/mediator.service';

@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.scss']
})
export class ViewbookingsComponent implements OnInit {

  bookings: BookingModel[] = [];
  searchDate: Date;
  alert: any;
  loading: boolean;

  messages = {emptyMessage: 'No Bookings found. Try different parameters', totalMessage: 'Total Bookings'};

  constructor(private bookingService: BookingService, private mediator: MediatorService, private router: Router) { }

  ngOnInit() {
    this.searchDate = new Date();
    this.viewBookings();
  }

  viewBookings(): void {
    this.loading = true;
    console.log('Searching: ' + this.searchDate);
    this.bookingService.getBookings(this.dateToString(this.searchDate)).subscribe( resp => {
      this.loading = false;
      this.bookings = [ ... resp];
      // .sort((a: BookingModel, b: BookingModel) => {
      //   if (new Date(b.checkout) > new Date(a.checkout)) {
      //       return 1;
      //   }
      //   if (new Date(b.checkout) < new Date(b.checkout)) {
      //     return -1;
      //   }
      //   return 0;
      // });
      // this.alert = {type: 'success', message: 'Found ' + this.bookings.length + ' bookings.'};
    },
    error => {
      this.loading = false;
      this.alert = {type: 'danger', message: 'Something went wrong, please try again later.'};
      console.log('erro:' + JSON.stringify(error));
  });
  }

  viewABooking(booking: BookingModel) {
    this.mediator.selectedBooking(booking);
    this.router.navigate([ 'view/booking' ], {queryParams: {action: 'checkout'}});
  }

  private dateToString(date: Date): string {
    const day = date.getDate();
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const munites = date.getMinutes();
    const datestr = `${year}-${monthIndex < 10 ?  '0' + monthIndex : monthIndex}-${day < 10 ?  '0' + day : day}`;
    console.log(datestr);
    return datestr;
  }

  close(alert: any) {
    this.alert = null;
  }



}
