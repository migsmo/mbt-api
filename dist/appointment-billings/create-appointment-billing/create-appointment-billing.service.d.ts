import { SupabaseClient } from '@supabase/supabase-js';
import { CreateAppointmentBillingRequest } from './dto/create-appointment-billing-request.dto';
import { CreateAppointmentBillingResponse } from './dto/create-appointment-billing-response.dto';
export declare class CreateAppointmentBillingService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    createAppointmentBilling(request: CreateAppointmentBillingRequest): Promise<CreateAppointmentBillingResponse>;
}
