import { SupabaseClient } from '@supabase/supabase-js';
import { AssignStaffAppointmentsRequestDto } from './dto/assign-staff-appointments-request.dto';
import { AssignStaffAppointmentsResponse } from './dto/assign-staff-appointments-response.dto';
export declare class AssignStaffAppointmentsService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    assignStaffToAppointments(request: AssignStaffAppointmentsRequestDto): Promise<AssignStaffAppointmentsResponse>;
    private findStaffById;
}
