import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateEmployeeRequest } from './dto/update-employee-request.dto';
import { UpdateEmployeeResponse } from './dto/update-employee-response.dto';
export declare class UpdateEmployeeService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    updateEmployee(request: UpdateEmployeeRequest): Promise<UpdateEmployeeResponse>;
}
