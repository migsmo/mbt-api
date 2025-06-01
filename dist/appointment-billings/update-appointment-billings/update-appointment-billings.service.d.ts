import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateAppointmentBillingsRequest } from './dto/update-appointment-billings-request.dto';
import { UpdateAppointmentBillingsResponse } from './dto/update-appointment-billings-response.dto';
export declare class UpdateAppointmentBillingsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    updateAppointmentBillings(request: UpdateAppointmentBillingsRequest): Promise<UpdateAppointmentBillingsResponse>;
}
