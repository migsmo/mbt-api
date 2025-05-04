import { SupabaseClient } from '@supabase/supabase-js';
import Decimal from 'decimal.js';
import { AppointmentsHelper } from './appointments.helpers';
export declare class EmployeesHelper {
    private readonly appointmentsHelper;
    constructor(appointmentsHelper: AppointmentsHelper);
    getEmployeeCommission(supabase: SupabaseClient, employeeId: string, year: number, month: number): Promise<Decimal>;
}
