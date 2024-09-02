/**
 * Types
 * @author - Faizal 
 * @date - 23rd August 2024
 */
// GENERIC IMPORT
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query';

// UTILS IMPORT
import {NotificationEnum} from './enum';

// NOTIFICATION CONTEXT DATA TYPE
export type NotificationContextType = {
    type: NotificationEnum,
    message: string,
    isOpen: boolean,
}

// CAFE SHOP TYPE
export type CafeShopType = {
    id?: string;
    name: string;
    description: string;
    total_employees: number;
    location: string;
}

// EMPLOYEE DATA TYPE
export type EmployeeType = {
    id?: string;
    name: string;
    email_address: string;
    phone_number: string;
    gender: string;
    job_start_date?: string;
    job_end_date?: string;
    days_worked: number;
    cafe_shop_id: string;
    cafe_shop_name: string;
}

// SELECT OPTION TYPE
export type SelectOptionsType = {
    label: string | number,
    value: string | number
}

export type RefetchFunction = (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult>;