import { GetAllAppointmentBillingsService } from './get-all-appointment-billings.service';
export declare class GetAllAppointmentBillingsController {
    private readonly getAllAppointmentBillingsService;
    constructor(getAllAppointmentBillingsService: GetAllAppointmentBillingsService);
    getAllAppointmentBillings(id: string): Promise<import("./dto/get-all-appointment-billings-response.dto").GetAllAppointmentBillingsResponse>;
}
