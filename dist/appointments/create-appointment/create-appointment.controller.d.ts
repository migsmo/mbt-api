import { CreateAppointmentService } from './create-appointment.service';
import { CreateAppointmentRequest } from './dto/create-appointment-request.dto';
import { CreateAppointmentResponse } from './dto/create-appointment-response.dto';
export declare class CreateAppointmentController {
    private readonly createAppointmentService;
    constructor(createAppointmentService: CreateAppointmentService);
    createAppointment(request: CreateAppointmentRequest): Promise<CreateAppointmentResponse>;
}
