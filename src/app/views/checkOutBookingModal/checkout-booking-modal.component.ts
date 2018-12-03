import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { tap, map } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { datetimesettings, deepCopy } from '../../utils/utils';
import { ActivatedRoute } from '@angular/router';
import { BookingModel, BookingService, GetVehicleResult, FindCustomerResult } from 'src/app/Api_Module';
import { MediatorService } from 'src/app/services/mediator.service';
import { Booking } from 'src/app/models/booking.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout-booking-modal',
  templateUrl: './checkout-booking-modal.component.html',
})
export class CheckOutBookingModalComponent implements OnInit {

  @Input() booking: BookingModel;
  @Output() success: EventEmitter<any> = new EventEmitter();
  paymentMethod: string;
  loading: boolean;

  constructor(private modalService: NgbModal, private bookingService: BookingService, private route: ActivatedRoute) {
  }


  ngOnInit() {

  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
    this.paymentMethod = '';
  }

  close(alert: any) {
    // this.alert = null;
  }


  checkout() {
    console.log('checkout data' + JSON.stringify(this.booking));
    this.loading = true;
    this.bookingService.checkout({ id: this.booking.bookingId, paymentMethod: this.paymentMethod }).subscribe(resp => {
      this.loading = false;
      alert('Checkout Complete');
      this.booking.isComplete = true;
    },
      error => {
        this.loading = false;
        alert('Something went wrong please try again later!');
        console.log('error:' + JSON.stringify(error));
      });
  }
}
