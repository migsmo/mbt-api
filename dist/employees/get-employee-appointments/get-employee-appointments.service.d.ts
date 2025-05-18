import { SupabaseClient } from '@supabase/supabase-js';
import { Appointments } from 'src/entity/appointments.entity';
import { AppointmentServices } from 'src/entity/appointmentService.entity';
import { Service } from 'src/entity/service.entity';
import { AppointmentsHelper } from 'src/helpers/appointments.helpers';
import { CustomerHelper } from 'src/helpers/customers.helper';
import { EmployeesHelper } from 'src/helpers/employees.helpers';
import { ServicesHelper } from 'src/helpers/services.helper';
import { GetEmployeeAppointmentsRequest } from './dto/get-employee-appointments.request.dto';
import { EmployeeAppointments, GetEmployeeAppointmentsResponse } from './dto/get-employee-appointments.response.dto';
export declare class GetEmployeeAppointmentsService {
    private readonly supabase;
    private readonly appointmentsHelper;
    private readonly servicesHelper;
    private readonly customerHelper;
    private readonly employeesHelper;
    constructor(supabase: SupabaseClient, appointmentsHelper: AppointmentsHelper, servicesHelper: ServicesHelper, customerHelper: CustomerHelper, employeesHelper: EmployeesHelper);
    getAllEmployeeAppointments(employeeId: string, params: GetEmployeeAppointmentsRequest): Promise<GetEmployeeAppointmentsResponse>;
    getAppointment(appointment: Appointments, appointmentServicesList: AppointmentServices[], services: Service[]): Promise<EmployeeAppointments>;
}
