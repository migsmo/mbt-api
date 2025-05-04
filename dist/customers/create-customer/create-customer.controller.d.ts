import { CreateCustomerService } from './create-customer.service';
import { CreateCustomerRequest } from './dto/create-customer-request.dto';
export declare class CreateCustomerController {
    private readonly createCustomerService;
    constructor(createCustomerService: CreateCustomerService);
    create(request: CreateCustomerRequest): Promise<import("./dto/create-customer-response.dto").CreateCustomerResponse>;
}
