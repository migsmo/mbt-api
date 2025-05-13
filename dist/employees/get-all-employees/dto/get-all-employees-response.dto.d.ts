import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
import { GetEmployeeResponse } from 'src/employees/get-employee/dto/get-empoyee-response.dto';
export declare class GetAllEmployeesResponse {
    employees: GetEmployeeResponse[];
    meta: PaginationMeta;
}
