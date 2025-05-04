import { SupabaseClient } from '@supabase/supabase-js';
import { GetAllAppointmentBillingsResponse } from './dto/get-all-appointment-billings-response.dto';
export declare class GetAllAppointmentBillingsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getAllAppointmentBillings(appointmentId: string): Promise<GetAllAppointmentBillingsResponse>;
}
