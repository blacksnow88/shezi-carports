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

  loading: boolean;

  constructor(private modalService: NgbModal, private bookingService: BookingService, private route: ActivatedRoute) {
  }


  ngOnInit() {

  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
    console.log('checkout data' + JSON.stringify(this.booking));
  }

  close(alert: any) {
    // this.alert = null;
  }


  checkout() {
    console.log('checkout data' + JSON.stringify(this.booking));
    this.loading = true;
    this.bookingService.checkout({ id: this.booking.bookingId, paymentMethod: this.booking.paymentType}).subscribe(resp => {
      this.loading = false;
      alert('Checkout Complete');
      this.modalService.dismissAll();
    },
      error => {
        this.loading = false;
        alert('Something went wrong please try again later!');
        console.log('error:' + JSON.stringify(error));
      });
  }
}
