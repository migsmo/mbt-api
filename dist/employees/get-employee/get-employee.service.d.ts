import { SupabaseClient } from '@supabase/supabase-js';
import { EmployeesHelper } from 'src/helpers/employees.helpers';
import { GetEmployeeResponse } from './dto/get-empoyee-response.dto';
export declare class GetEmployeeService {
    private readonly supabase;
    private readonly employeesHelper;
    constructor(supabase: SupabaseClient, employeesHelper: EmployeesHelper);
    getEmployee(id: string): Promise<GetEmployeeResponse>;
}
