import { SupabaseClient } from '@supabase/supabase-js';
import Decimal from 'decimal.js';
import { AppointmentServices } from 'src/entity/appointmentService.entity';
import { Service } from 'src/entity/service.entity';
import { AppointmentsHelper } from './appointments.helpers';
export declare class EmployeesHelper {
    private readonly appointmentsHelper;
    constructor(appointmentsHelper: AppointmentsHelper);
    getEmployeeCommission(supabase: SupabaseClient, employeeId: string, year: number, month: number): Promise<Decimal>;
    calculateEmployeeCommissionByAppointmentServices(appointmentServicesData: AppointmentServices[], servicesData: Service[]): Decimal;
}
