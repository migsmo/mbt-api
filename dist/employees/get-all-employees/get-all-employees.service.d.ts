import { SupabaseClient } from '@supabase/supabase-js';
import { EmployeesHelper } from 'src/helpers/employees.helpers';
import { GetAllEmployeesRequest } from './dto/get-all-employees-request.dto';
import { GetAllEmployeesResponse } from './dto/get-all-employees-response.dto';
export declare class GetAllEmployeesService {
    private readonly supabase;
    private readonly employeesHelper;
    constructor(supabase: SupabaseClient, employeesHelper: EmployeesHelper);
    getAllEmployees(params: GetAllEmployeesRequest): Promise<GetAllEmployeesResponse>;
    private mapEmployeeData;
}
