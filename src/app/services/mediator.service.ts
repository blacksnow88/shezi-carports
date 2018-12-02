import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { BookingModel, CreateVehicle } from '../Api_Module';



@Injectable({
    providedIn: 'root',
  })
  export class MediatorService {

    private selectedBooking$: BehaviorSubject<BookingModel> = new BehaviorSubject(null);
    private selectedVehicle$: BehaviorSubject<CreateVehicle> = new BehaviorSubject(null);


    constructor(private http: HttpClient) {

    }

    getBooking(): Observable<BookingModel> {
        return this.selectedBooking$.asObservable();
    }

    selectedBooking(booking: BookingModel): void {
        this.selectedBooking$.next(booking);
    }

  }
