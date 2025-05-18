import { SupabaseClient } from '@supabase/supabase-js';
import { Appointments } from 'src/entity/appointments.entity';
export declare class AppointmentsHelper {
    getAppointmentByStartAndEndDate(supabase: SupabaseClient, startDate: string, endDate: string): Promise<Appointments[]>;
    getAppointmentById(supabase: SupabaseClient, appointmentId: string): Promise<Appointments>;
    getAppointmentByIds(supabase: SupabaseClient, appointmentIds: string[], sortBy: string, sortDirection: 'asc' | 'desc'): Promise<Appointments[]>;
}
