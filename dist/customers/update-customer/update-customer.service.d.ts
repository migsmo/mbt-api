import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateCustomerRequest } from './dto/update-customer-request.dto';
import { UpdateCustomerResponse } from './dto/update-customer-response.dto';
export declare class UpdateCustomerService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    updateCustomer(request: UpdateCustomerRequest): Promise<UpdateCustomerResponse>;
}
