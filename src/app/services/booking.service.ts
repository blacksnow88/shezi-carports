import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
  })
  export class BookingService {

    selectedBooking: Booking;

    private jsonHeaders;
    private api = 'https://carncierge.azurewebsites.net/api/Booking';

    constructor(private http: HttpClient) {
        this.jsonHeaders = new Headers();
        this.jsonHeaders.append('Content-Type', 'application/json');
        this.jsonHeaders.append('accept', 'application/json');
    }

    makeBooking(booking: Booking): Observable<HttpResponse<Booking>> {

        return this.http.post<Booking>(this.api, booking, {headers: this.jsonHeaders, observe: 'response'});
    }

    updateBooking(booking: Booking): Observable<any> {
        return this.http.put<Booking>(this.api, booking, {headers: this.jsonHeaders, observe: 'response'});
    }

    getBookings(date: string): Observable<HttpResponse<Booking[]>> {
        const req =  this.api + '?date=' + date;
        return this.http.get<Booking[]>(req, { observe: 'response' });
    }

    checkoutBooking(bookingId: number): Observable<any> {
        const req =  `${this.api}/${bookingId}/checkout`;
        return this.http.post(req, null);
    }

  }
