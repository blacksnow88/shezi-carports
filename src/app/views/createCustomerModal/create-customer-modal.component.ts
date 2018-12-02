import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FindCustomerResult, CreateVehicle, CreateCustomer, CustomersService, VehiclesService } from 'src/app/Api_Module';

@Component({
  selector: 'app-create-customer-modal',
  templateUrl: './create-customer-modal.component.html',
})
export class CreateCustomerModalComponent implements OnInit {


  ownerVeh: CreateCustomer;
  customerId: number;
  @Output() success: EventEmitter<any> = new EventEmitter();
  titles: string[];
  loading: boolean;
  alert: any;

  constructor(private modalService: NgbModal, private cutomersService: CustomersService, private vehiclesService: VehiclesService) { }

  ngOnInit() {
    this.ownerVeh = { title: '', name: '', surname: '', email: '', cellphone: '', registration: '' };
  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  create() {
    this.cutomersService.post(this.ownerVeh).subscribe((resp) => {
      this.loading = false;
      this.customerId = resp;
      this.success.emit({customerId: this.customerId, owner: this.ownerVeh});
      this.alert = { type: 'success', message: 'Created! \n* customer number: ' + this.customerId };
    },
      error => {
        this.loading = false;
        alert('Something went wrong please try again later!');
        this.alert = { type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error.error) + '`' };
        console.log('error:' + JSON.stringify(error));
      });
  }

  close(alert: any) {
    this.alert = null;
  }

}
