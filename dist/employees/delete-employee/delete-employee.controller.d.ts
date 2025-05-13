import { DeleteEmployeeService } from './delete-employee.service';
export declare class DeleteEmployeeController {
    private readonly deleteEmployeeService;
    constructor(deleteEmployeeService: DeleteEmployeeService);
    deleteEmployee(id: string): Promise<import("./dto/delete-employee-response,dto").DeleteEmployeeResponse>;
}
