import { SupabaseClient } from '@supabase/supabase-js';
import { DeleteEmployeeResponse } from './dto/delete-employee-response,dto';
export declare class DeleteEmployeeService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    deleteEmployee(id: string): Promise<DeleteEmployeeResponse>;
}
