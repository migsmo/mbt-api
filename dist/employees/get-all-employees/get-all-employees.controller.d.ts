import { GetAllEmployeesRequest } from './dto/get-all-employees-request.dto';
import { GetAllEmployeesService } from './get-all-employees.service';
export declare class GetAllEmployeesController {
    private readonly getAllEmployeesService;
    constructor(getAllEmployeesService: GetAllEmployeesService);
    getAllEmployees(query: GetAllEmployeesRequest): Promise<import("./dto/get-all-employees-response.dto").GetAllEmployeesResponse>;
}
