import { SupabaseClient } from '@supabase/supabase-js';
import { Appointments } from 'src/entity/appointments.entity';
export declare class AppointmentsHelper {
    getAppointmentByStartAndEndDate(supabase: SupabaseClient, startDate: string, endDate: string): Promise<Appointments[]>;
}
