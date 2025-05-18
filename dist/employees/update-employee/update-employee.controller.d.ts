import { UpdateEmployeeRequest } from './dto/update-employee-request.dto';
import { UpdateEmployeeResponse } from './dto/update-employee-response.dto';
import { UpdateEmployeeService } from './update-employee.service';
export declare class UpdateEmployeeController {
    private readonly updateEmployeeService;
    constructor(updateEmployeeService: UpdateEmployeeService);
    updateEmployee(request: UpdateEmployeeRequest): Promise<UpdateEmployeeResponse>;
}
