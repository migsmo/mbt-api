import { GetAllAppointmentsByCustomerRequest } from './dto/get-all-appointments-by-customer.request.dto';
import { GetAllAppointmentsByCustomerResponse } from './dto/get-all-appointments-by-customer.response.dto';
import { GetAllAppointmentsByCustomerService } from './get-all-appointments-by-customer.service';
export declare class GetAllAppointmentsByCustomerController {
    private readonly getAllAppointmentsByCustomerService;
    constructor(getAllAppointmentsByCustomerService: GetAllAppointmentsByCustomerService);
    getAllAppointmentsByCustomer(id: string, query: GetAllAppointmentsByCustomerRequest): Promise<GetAllAppointmentsByCustomerResponse>;
}
