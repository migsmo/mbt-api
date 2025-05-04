import { GetAllCustomersRequest } from './dto/get-all-customers-request.dto';
import { GetAllCustomersResponse } from './dto/get-all-customers-response.dto';
import { GetAllCustomersService } from './get-all-customers.service';
export declare class GetAllCustomersController {
    private readonly getAllCustomersService;
    constructor(getAllCustomersService: GetAllCustomersService);
    getAllCustomers(query: GetAllCustomersRequest): Promise<GetAllCustomersResponse>;
}
