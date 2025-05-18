import { GetEmployeeAppointmentsRequest } from './dto/get-employee-appointments.request.dto';
import { GetEmployeeAppointmentsResponse } from './dto/get-employee-appointments.response.dto';
import { GetEmployeeAppointmentsService } from './get-employee-appointments.service';
export declare class GetEmployeeAppointmentsController {
    private readonly getEmployeeAppointmentsService;
    constructor(getEmployeeAppointmentsService: GetEmployeeAppointmentsService);
    getAllEmployeeAppointments(employeeId: string, query: GetEmployeeAppointmentsRequest): Promise<GetEmployeeAppointmentsResponse>;
}
