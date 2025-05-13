import { CreateEmployeeService } from './create-employee.service';
import { CreateEmployeeRequest } from './dto/create-employee-request.dto';
export declare class CreateEmployeeController {
    private readonly createEmployeeService;
    constructor(createEmployeeService: CreateEmployeeService);
    createEmployee(request: CreateEmployeeRequest): Promise<import("./dto/create-employee-response.dto").CreateEmployeeResponse>;
}
