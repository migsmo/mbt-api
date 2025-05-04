import { GetAllAppointmentsResponse } from './dto/get-all-appointments-response.dto';
import { GetAllAppointmentsRequest } from './dto/get-all-appointments.request.dto';
import { GetAllAppointmentsService } from './get-all-appointments.service';
export declare class GetAllAppointmentsController {
    private readonly getAllAppointmentsService;
    constructor(getAllAppointmentsService: GetAllAppointmentsService);
    getAvailableSlotsByDay(request: GetAllAppointmentsRequest): Promise<GetAllAppointmentsResponse>;
}
