import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CreateCustomer, CustomersService, FindCustomerResult, UpdateCustomer, CreateVehicle, VehiclesService } from 'src/app/Api_Module';

@Component({
  selector: 'app-new-customer-details',
  templateUrl: './new-customer-details.component.html'
})
export class NewCustomerDetailsComponent implements OnInit {


  @Input() ownerVeh: FindCustomerResult;
  titles: string[];

  constructor() { }

  ngOnInit() {
    this.titles = ['Miss', 'Mr', 'Mrs', 'Ms', 'Prof', 'Rev', 'Sir'];
  }
}
