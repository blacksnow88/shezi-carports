import { Component, OnInit, Input } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { datetimesettings, deepCopy } from '../../utils/utils';
import { ActivatedRoute } from '@angular/router';
import { BookingModel, BookingService, GetVehicleResult, FindCustomerResult } from 'src/app/Api_Module';
import { MediatorService } from 'src/app/services/mediator.service';
import { Booking } from 'src/app/models/booking.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-booking-modal',
  templateUrl: './create-booking-modal.component.html',
})
export class CreateBookingModalComponent implements OnInit {

  @Input() buttonText?: string;
  @Input() buttonClass?: string;
  @Input() vehicle?: GetVehicleResult;
  @Input() customer?: FindCustomerResult;
  @Input() bookingExisting?: BookingModel;
  booking: BookingModel;

  times: string[] = [];
  alert: any;
  loading: boolean;
  makebooking$: Observable<any>;
  checkout$: Observable<any>;

  dropDate: Date;
  collectionDate: Date;
  dropTime: number;
  collectionTime: number;

  updateMode: boolean ;



  constructor(private modalService: NgbModal, private bookingService: BookingService, private route: ActivatedRoute) {
  }


  ngOnInit() {

    for (let t = 0; t < 24; t++) {
      this.times.push(t.toString());
    }
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
    if (!!this.bookingExisting && this.bookingExisting.bookingId > 0) {

      this.booking = this.bookingExisting;
      this.collectionDate = new Date(this.booking.checkout);
      this.dropDate = new Date(this.booking.checkIn);
      this.collectionTime = this.collectionDate.getHours();
      this.dropTime = this.dropDate.getHours();
      this.updateMode = true;
    } else {
      this.Init();
      this.updateMode = false;
    }
  }

  private Init() {
    this.booking = {};
    this.collectionDate = new Date();
    this.dropDate = new Date();
    this.collectionDate.setDate(this.collectionDate.getDate() + 1);
  }

  close(alert: any) {
    this.alert = null;
  }


  private dateToString(date: Date, hours?: number): string {
    const day = date.getDate();
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();
    if (!hours) {
      hours = date.getHours();
    }
    const munites = date.getMinutes();
    const datestr = `${year}-${monthIndex < 10 ?  '0' + monthIndex : monthIndex}-${day < 10 ?  '0' + day : day}`
    + `T${hours < 10 ?  '0' + hours : hours}:${munites < 10 ?  '0' + munites : munites}`;
    console.log(datestr);
    return datestr;
  }

  createBooking() {
    console.log('book data' + JSON.stringify(this.booking));
    this.alert = null;
    this.loading = true;
    this.booking.checkIn = this.dropDate;
    this.booking.checkout = this.collectionDate;
    this.booking.checkIn.setHours(this.dropTime, 0, 0, 0);
    this.booking.checkout.setHours(this.collectionTime, 0, 0, 0);
    this.booking.vehicleId = this.vehicle.id;
    this.bookingService.createBooking(this.booking).subscribe(resp => {
      this.loading = false;
      // const booking: Booking = resp.body;
      alert('Booking Captured!');
      this.modalService.dismissAll();
    },
      error => {
        this.loading = false;
        alert('Something went wrong please try again later!');
        this.alert = { type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error.error) + '`' };
        console.log('error:' + JSON.stringify(error));
      });
  }

  updateBooking() {
    console.log('book data' + JSON.stringify(this.booking));
    this.alert = null;
    this.loading = true;
    this.booking.checkIn = this.dropDate;
    this.booking.checkout = this.collectionDate;
    this.booking.checkIn.setHours(this.dropTime, 0, 0, 0);
    this.booking.checkout.setHours(this.collectionTime, 0, 0, 0);
    this.bookingService.updateBooking(this.booking).subscribe(resp => {
      this.loading = false;
      // const booking: Booking = resp.body;
      alert('Booking Updated!');
      this.modalService.dismissAll();
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
      this.bookingService.checkout({id: this.booking.bookingId, paymentMethod: this.booking.paymentType}).subscribe(resp => {
        alert('Checkout Complete, see details!');
        this.alert = { type: 'success', message: 'Checkout Complete! \n DAYS: ' + resp.days + '\n HOURS:'
        + resp.hours + '\n PRICE: R ' + resp.price  };
        this.booking.isComplete = true;
        // this.initBooking();
      },
        error => {
          alert('Something went wrong please try again later!');
          this.alert = { type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error.error) + '`' };
          console.log('error:' + JSON.stringify(error));
        });
    }
  }
}
