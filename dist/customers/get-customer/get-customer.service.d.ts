import { SupabaseClient } from '@supabase/supabase-js';
import { GetCustomerResponse } from '../get-customer/dto/get-customer-response.dto';
export declare class GetCustomerService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getCustomerById(id: string): Promise<GetCustomerResponse>;
}
