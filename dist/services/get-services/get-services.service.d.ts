import { SupabaseClient } from '@supabase/supabase-js';
import { GetServicesRequest } from './dto/get-services-request.dto';
import { GetServicesResponse } from './dto/get-services-response.dto';
export declare class GetServicesService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    getServices(params: GetServicesRequest): Promise<GetServicesResponse>;
    private mapServiceData;
}
