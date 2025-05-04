import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateAppointmentStatusRequest } from './dto/update-appointment-status-request.dto';
import { UpdateAppointmentStatusResponse } from './dto/update-appointment-status-response.dto';
export declare class UpdateAppointmentStatusService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    updateAppointmentStatus(request: UpdateAppointmentStatusRequest): Promise<UpdateAppointmentStatusResponse>;
}
