import { GetAppointmentService } from './get-appointment.service';
export declare class GetAppointmentController {
    private readonly getAppointmentService;
    constructor(getAppointmentService: GetAppointmentService);
    getAppointmentById(id: string): Promise<import("./dto/get-appointment-response.dto").GetAppointmentResponse>;
}
