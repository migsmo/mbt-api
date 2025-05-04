import { GetCustomerService } from './get-customer.service';
export declare class GetCustomerController {
    private readonly getCustomerService;
    constructor(getCustomerService: GetCustomerService);
    getCustomerById(id: string): Promise<import("./dto/get-customer-response.dto").GetCustomerResponse>;
}
