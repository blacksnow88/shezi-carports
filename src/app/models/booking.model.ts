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

    private dateToString(date: Date): string {
        const day = date.getDate();
        const monthIndex = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const munites = date.getMinutes();
        const datestr = `${year}-${monthIndex < 10 ?  '0' + monthIndex : monthIndex}-${day < 10 ?  '0' + day : day}T${hours < 10 ?  '0' + hours : hours}:${munites < 10 ?  '0' + munites : munites}`;
        console.log(datestr);
        return datestr;
      }
}
