import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
  })
  export class BookingService {

    selectedBooking: Booking;

    private api = 'https://carncierge.azurewebsites.net/api/Booking';

    constructor(private http: HttpClient) { }

    makeBooking(booking: Booking): Observable<any> {
        return this.http.post(this.api, booking);
    }

    updateBooking(booking: Booking): Observable<any> {
        return this.http.put(this.api, booking);
    }

    getBookings(date: string): Observable<HttpResponse<Booking[]>> {
        const req =  this.api + '?date=' + date;
        return this.http.get<Booking[]>(req, { observe: 'response' });
    }

    checkoutBooking(bookingId: number): Observable<any> {
        const req =  `${this.api}/${bookingId}/checkout`;
        return this.http.post(this.api, null);
    }

  }
