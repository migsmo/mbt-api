import { SupabaseClient } from '@supabase/supabase-js';
import { GetAppointmentResponse } from './dto/get-appointment-response.dto';
export declare class GetAppointmentService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getAppointmentById(id: string): Promise<GetAppointmentResponse>;
}
