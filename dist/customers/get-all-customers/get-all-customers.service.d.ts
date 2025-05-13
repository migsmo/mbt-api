import { SupabaseClient } from '@supabase/supabase-js';
import { GetAllCustomersRequest } from './dto/get-all-customers-request.dto';
import { GetAllCustomersResponse } from './dto/get-all-customers-response.dto';
export declare class GetAllCustomersService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getAllCustomersService(params: GetAllCustomersRequest): Promise<GetAllCustomersResponse>;
    private mapCustomerData;
}
