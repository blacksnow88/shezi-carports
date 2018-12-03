import { GetVehicleResult } from './models';

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


export interface FindCustomerResult {
    id?: number;
    title?: string;
    name?: string;
    surname?: string;
    cellphone?: string;
    email?: string;
    idNumber?: string;
    company?: string;
    customerNumber?: string;
    cars?: GetVehicleResult[];
}