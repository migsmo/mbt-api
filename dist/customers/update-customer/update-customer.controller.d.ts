import { UpdateCustomerRequest } from './dto/update-customer-request.dto';
import { UpdateCustomerService } from './update-customer.service';
export declare class UpdateCustomerController {
    private readonly updateCustomerService;
    constructor(updateCustomerService: UpdateCustomerService);
    create(request: UpdateCustomerRequest): Promise<import("./dto/update-customer-response.dto").UpdateCustomerResponse>;
}
