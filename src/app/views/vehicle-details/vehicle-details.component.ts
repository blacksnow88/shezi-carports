import { Component, OnInit, Input } from '@angular/core';
import { CreateVehicle, VehiclesService, GetVehicleResult } from 'src/app/Api_Module';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.scss']
})
export class VehicleDetailsComponent implements OnInit {

  @Input() vehicle: CreateVehicle;
  @Input() editMode: boolean;
  loading: boolean;
  alert: any;

  constructor(private vehiclesService: VehiclesService) { }

  ngOnInit() {
    if (!this.vehicle) {
      this.vehicle = {customerId: 0, registration: ''};
    }
  }
  create() {
    this.vehiclesService.post(this.vehicle).subscribe((resp)  => {
      this.loading = false;
      const vehicle: GetVehicleResult = resp;
      alert('Vehicle Created!');
      this.alert = { type: 'success', message: 'Created! \n* Vehicle number: ' + vehicle.id +
    '\n* Registration: ' + vehicle.registration };
    },
      error => {
        this.loading = false;
        alert('Something went wrong please try again later!');
        this.alert = { type: 'danger', message: 'Something went wrong please try again later. `-' + JSON.stringify(error.error) + '`' };
        console.log('error:' + JSON.stringify(error));
      });
  }

}
