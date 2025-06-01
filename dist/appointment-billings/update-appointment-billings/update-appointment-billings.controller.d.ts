import { UpdateAppointmentBillingsRequest } from './dto/update-appointment-billings-request.dto';
import { UpdateAppointmentBillingsResponse } from './dto/update-appointment-billings-response.dto';
import { UpdateAppointmentBillingsService } from './update-appointment-billings.service';
export declare class UpdateAppointmentBillingsController {
    private readonly updateAppointmentBillingsService;
    constructor(updateAppointmentBillingsService: UpdateAppointmentBillingsService);
    updateAppointmentBillings(request: UpdateAppointmentBillingsRequest): Promise<UpdateAppointmentBillingsResponse>;
}
