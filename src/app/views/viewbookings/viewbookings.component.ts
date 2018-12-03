import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BookingModel, BookingService } from 'src/app/Api_Module';
import { MediatorService } from 'src/app/services/mediator.service';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-viewbookings',
  templateUrl: './viewbookings.component.html',
  styleUrls: ['./viewbookings.component.scss']
})
export class ViewbookingsComponent implements OnInit {

  @ViewChild(DatatableComponent) table: DatatableComponent;
  filtervalue;

  bookings: BookingModel[] = [];
  cache: BookingModel[] = [];
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
      this.cache = [ ... resp];
      this.bookings = [ ... resp]
      .sort((a: BookingModel, b: BookingModel) => {
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
      this.alert = {type: 'danger', message: 'Something went wrong, please try again later.'};
      console.log('erro:' + JSON.stringify(error));
  });
  }

  viewABooking(booking: BookingModel) {
    this.mediator.selectedBooking(booking);
    this.router.navigate([ 'view/booking' ], {queryParams: {action: 'checkout'}});
  }

  checkin(booking) {
    this.loading = true;
    const conf = confirm(`Do you want to Check In this booking?
    ${booking.title} ${booking.name} ${booking.surname} - ${booking.registration}`);
    if (conf === true) {
      this.bookingService.checkIn(booking.bookingId).subscribe(resp => {
        this.loading = false;
        alert('Check In Complete');
        this.viewBookings();
      },
        error => {
          this.loading = false;
          alert('Something went wrong please try again later!');
          console.log('error:' + JSON.stringify(error));
        });
    }
  }

  printInvoice(bookingId) {

    let popupWin;
    popupWin = window.open(`${this.bookingService.configuration.basePath}/api/Booking/${bookingId}/invoice`,
    '_blank', 'top=0,left=0,height=100%,width=auto');
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

  updateFilter(event) {
    const val = this.filtervalue;

    if (val) {
        // filter our data
    const temp = this.bookings.filter(function(d) {
      return (d.registration && d.registration.toLowerCase().indexOf(val) !== -1) ||
      (d.name && d.name.toLowerCase().indexOf(val) !== -1) ||
      (d.surname && d.surname.toLowerCase().indexOf(val) !== -1) || !val;
    });

    // update the rows
    this.bookings = temp;
    } else {
      this.bookings = [... this.cache];
    }
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  clearFilter() {
    this.filtervalue = '';
    this.bookings = [... this.cache];
  }

  close(alert: any) {
    this.alert = null;
  }



}
