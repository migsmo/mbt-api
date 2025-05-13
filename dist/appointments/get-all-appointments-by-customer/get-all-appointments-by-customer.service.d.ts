import { SupabaseClient } from '@supabase/supabase-js';
import { GetAllAppointmentsByCustomerRequest } from './dto/get-all-appointments-by-customer.request.dto';
import { GetAllAppointmentsByCustomerResponse } from './dto/get-all-appointments-by-customer.response.dto';
export declare class GetAllAppointmentsByCustomerService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getAllAppointmentsByCustomer(customerId: string, params: GetAllAppointmentsByCustomerRequest): Promise<GetAllAppointmentsByCustomerResponse>;
    private mapAppointmentData;
}
