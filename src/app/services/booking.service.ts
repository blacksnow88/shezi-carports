import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';



@Injectable({
    providedIn: 'root',
  })
  export class BookingService {

    private api = 'http://xql.dedicated.co.za:8999/api/Booking';

    constructor(private http: HttpClient) { }

    makeBooking(booking: Booking): Observable<any> {
        return this.http.post(this.api, booking);
    }

    getBookings(date: Date): Observable<HttpResponse<Booking>> {
        const req =  this.api + '?date=' + date;
        return this.http.get<Booking>(this.api, { observe: 'response' });
    }

  }
