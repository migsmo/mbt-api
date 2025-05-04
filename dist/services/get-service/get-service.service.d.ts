import { SupabaseClient } from '@supabase/supabase-js';
import { GetServiceResponse } from '../get-service/dto/get-service-response.dto';
export declare class GetServiceService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getServiceById(id: string): Promise<GetServiceResponse>;
}
