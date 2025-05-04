import { DeleteCustomerService } from './delete-customer.service';
export declare class DeletecustomersController {
    private readonly deleteCustomerService;
    constructor(deleteCustomerService: DeleteCustomerService);
    deleteCustomers(id: string): Promise<import("./dto/delete-customer-response.dto").DeleteCustomerResponse>;
}
