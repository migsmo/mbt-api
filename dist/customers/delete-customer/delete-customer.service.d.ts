import { SupabaseClient } from '@supabase/supabase-js';
import { DeleteCustomerResponse } from './dto/delete-customer-response.dto';
export declare class DeleteCustomerService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    deleteCustomer(id: string): Promise<DeleteCustomerResponse>;
}
