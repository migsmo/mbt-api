import { SupabaseClient } from '@supabase/supabase-js';
import { CreateEmployeeRequest } from './dto/create-employee-request.dto';
import { CreateEmployeeResponse } from './dto/create-employee-response.dto';
export declare class CreateEmployeeService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    createEmployee(request: CreateEmployeeRequest): Promise<CreateEmployeeResponse>;
}
