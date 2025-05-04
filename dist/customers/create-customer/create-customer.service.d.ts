import { SupabaseClient } from '@supabase/supabase-js';
import { CreateCustomerRequest } from './dto/create-customer-request.dto';
import { CreateCustomerResponse } from './dto/create-customer-response.dto';
export declare class CreateCustomerService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    createCustomer(data: CreateCustomerRequest): Promise<CreateCustomerResponse>;
}
