import { BookingModel } from '../Api_Module';


export class Booking implements BookingModel {
    status?: string;
    paymentType: string;
    bookingId: number;
    checkIn: Date;
    checkout: Date;
    vehicleId: number;
    ownerId: number;
    service: string;
    duration: string;
    bayNumber: string;
    isComplete: boolean;
    constructor() {
        this.isComplete = false;
        this.checkIn =  new Date();
        this.checkout =  new Date();
        this.checkout.setDate(this.checkout.getDate() + 1);
    }
}
