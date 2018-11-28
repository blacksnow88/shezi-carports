import { Owner } from './owner.model';
import { Vehicle } from './vehicle.model';

export class Booking {
    checkIn: string;
    checkout: string;
    vehicleId: number;
    owner: Owner;
    vehicle: Vehicle;
    duration: string;
    constructor() {
        // empty
        this.owner = new Owner();
        this.vehicle = new Vehicle();
    }
}
