import { CreateAppointmentBillingService } from './create-appointment-billing.service';
import { CreateAppointmentBillingRequest } from './dto/create-appointment-billing-request.dto';
export declare class CreateAppointmentBillingController {
    private readonly createAppointmentBillingService;
    constructor(createAppointmentBillingService: CreateAppointmentBillingService);
    createAppointmentBilling(request: CreateAppointmentBillingRequest): Promise<import("./dto/create-appointment-billing-response.dto").CreateAppointmentBillingResponse>;
}
