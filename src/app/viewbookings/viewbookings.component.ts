import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.scss']
})
export class ViewbookingsComponent implements OnInit {

  bookings: Booking[] = [];
  searchDate: string;
  alert: any;
  loading: boolean;

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit() {
    this.searchDate = this.dateToString(new Date());
    this.viewBookings();
  }

  viewBookings(): void {
    this.loading = true;
    console.log('Searching: ' + this.searchDate);
    this.bookingService.getBookings(this.searchDate).subscribe( resp => {
      this.loading = false;
      this.bookings = [... resp.body].sort((a: Booking, b: Booking) => {
        if (new Date(b.checkout) > new Date(a.checkout)) {
            return 1;
        }
        if (new Date(b.checkout) < new Date(b.checkout)) {
          return -1;
        }
        return 0;
      });
      this.alert = {type: 'success', message: 'Found ' + this.bookings.length + ' bookings.'};
    },
    error => {
      this.loading = false;
      this.alert = {type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error) + '`'};
      console.log('erro:' + JSON.stringify(error));
  });
  }

  viewABooking(booking: Booking) {
    this.bookingService.selectedBooking = booking;
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




}
