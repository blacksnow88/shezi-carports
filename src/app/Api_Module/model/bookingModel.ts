/**
 * Carncierge Valet Booking API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface BookingModel {
    voucherCount?: number;
    checkIn?: Date;
    checkout?: Date;
    vehicleId?: number;
    ownerId?: number;
    duration?: string;
    bookingId?: number;
    bayNumber?: string;
    isComplete?: boolean;
    service?: string;
    status?: string;
    paymentType?: string;
    notes?: string;
    title?: string;
    name?: string;
    surname?: string;
    registration?: string;
    reference?: string;
}
