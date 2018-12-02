export * from './booking.service';
import { BookingService } from './booking.service';
export * from './customers.service';
import { CustomersService } from './customers.service';
export * from './users.service';
import { UsersService } from './users.service';
export * from './vehicles.service';
import { VehiclesService } from './vehicles.service';
export const APIS = [BookingService, CustomersService, UsersService, VehiclesService];
