import { Component, OnInit } from '@angular/core';
import { Booking } from '../models/booking.model';
import { BookingService } from '../services/booking.service';

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

  constructor(private bookingService: BookingService) { }

  ngOnInit() {
    this.searchDate = this.dateToString(new Date());
    this.viewBookings();
  }

  viewBookings(): void {
    console.log('Searching: ' + this.searchDate);
    this.bookingService.getBookings(this.searchDate).subscribe( resp => {
      this.bookings = [... resp.body];
      this.alert = {type: 'success', message: 'Found ' + this.bookings.length + ' bookings.'};
    },
    error => {
      this.alert = {type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error) + '`'};
      console.log('erro:' + JSON.stringify(error));
  });
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
