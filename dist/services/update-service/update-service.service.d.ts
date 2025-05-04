import { SupabaseClient } from '@supabase/supabase-js';
import { GetServiceResponse } from '../get-service/dto/get-service-response.dto';
import { UpdateServiceRequest } from './dto/update-service-request.dto';
export declare class UpdateServiceService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    updateService(request: UpdateServiceRequest): Promise<GetServiceResponse>;
}
