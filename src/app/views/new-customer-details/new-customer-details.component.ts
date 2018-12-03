import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GetVehicleResult, CreateCustomer } from 'src/app/Api_Module';

@Component({
  selector: 'app-new-customer-details',
  templateUrl: './new-customer-details.component.html'
})
export class NewCustomerDetailsComponent implements OnInit {


  @Input() ownerVeh: CreateCustomer;
  titles: string[];

  constructor() { }

  ngOnInit() {
    this.titles = ['Miss', 'Mr', 'Mrs', 'Ms', 'Prof', 'Rev', 'Sir'];
  }
}
