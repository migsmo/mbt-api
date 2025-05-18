import { AssignStaffAppointmentsService } from './assign-staff-appointments.service';
import { AssignStaffAppointmentsRequestDto } from './dto/assign-staff-appointments-request.dto';
export declare class AssignStaffAppointmentsController {
    private readonly assignStaffAppointmentsService;
    constructor(assignStaffAppointmentsService: AssignStaffAppointmentsService);
    assignStaffToAppointment(request: AssignStaffAppointmentsRequestDto): Promise<import("./dto/assign-staff-appointments-response.dto").AssignStaffAppointmentsResponse>;
}
