import { UpdateAppointmentStatusRequest } from './dto/update-appointment-status-request.dto';
import { UpdateAppointmentStatusService } from './update-appointment-status.service';
export declare class UpdateAppointmentStatusController {
    private readonly updateAppointmentStatusService;
    constructor(updateAppointmentStatusService: UpdateAppointmentStatusService);
    updateAppointmentStatus(body: UpdateAppointmentStatusRequest): Promise<import("./dto/update-appointment-status-response.dto").UpdateAppointmentStatusResponse>;
}
