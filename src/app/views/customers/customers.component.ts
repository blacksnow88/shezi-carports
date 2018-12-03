import { Component, OnInit } from '@angular/core';
import { CustomersService, FindCustomerResult } from 'src/app/Api_Module';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html'
})
export class CustomersComponent implements OnInit {

  searchType = 'car';

  searchStr: string;

  loadingVehicles: boolean;
  loadingSearch: boolean;

  selectedCustomers: FindCustomerResult[] = [];
  selectedVeh: FindCustomerResult[] = [];
  selectedCustomer: FindCustomerResult;

  customers: FindCustomerResult[] = [];

  vehicles: any[] = [];

  alert;

  messages = {emptyMessage: 'No Customers found. Try different parameters', totalMessage: 'Total Customer'};

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
  }

  searchCustomers(searchStr?: string) {
    this.vehicles = [];
    if (!!searchStr) {
      this.searchStr = searchStr;
    }
    this.loadingSearch = true;
    this.customersService.find(this.searchStr.trim()).subscribe((resp: FindCustomerResult)  => {
      this.loadingSearch = false;
      this.customers = [resp];
    },
      error => {
        this.loadingSearch = false;
        if (error['status'] === 404) {
          alert('Customer Not Found!');
        } else {
          alert('Something went wrong please try again later!');
        }
        console.log('error:' + JSON.stringify(error));
      });
  }

  onSelect(custObj: any) {
    this.loadingVehicles = true;
    console.log(JSON.stringify(custObj));
    const customerId = custObj.selected[0].id;
    this.selectedCustomer = custObj.selected[0];
    this.customersService.get(customerId).subscribe((resp: FindCustomerResult)  => {
      this.loadingVehicles = false;
      this.vehicles = [... resp.cars];
    },
      error => {
        this.loadingVehicles = false;
        if (error['status'] === 404) {
          alert('Vehicle(S) Not Found!');
        } else {
          alert('Something went wrong please try again later!');
        }
        console.log('error:' + JSON.stringify(error));
      });
  }

  onSelectVeh(vehObj: any) {

  }


  close(alert: any) {
    this.alert = null;
  }
}
