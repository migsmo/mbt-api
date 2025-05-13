import { GetEmployeeService } from './get-employee.service';
export declare class GetEmployeeController {
    private readonly getEmployeeService;
    constructor(getEmployeeService: GetEmployeeService);
    getEmployee(id: string): Promise<import("./dto/get-empoyee-response.dto").GetEmployeeResponse>;
}
