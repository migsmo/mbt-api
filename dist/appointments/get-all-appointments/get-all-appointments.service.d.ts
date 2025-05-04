import { SupabaseClient } from '@supabase/supabase-js';
import { GetAllAppointmentsResponse } from './dto/get-all-appointments-response.dto';
import { GetAllAppointmentsRequest } from './dto/get-all-appointments.request.dto';
export declare class GetAllAppointmentsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getAllAppointments(request: GetAllAppointmentsRequest): Promise<GetAllAppointmentsResponse>;
    private mapAppointmentData;
}
