import { SupabaseClient } from '@supabase/supabase-js';
import { CreateServiceRequest } from './dto/create-service-request.dto';
import { CreateServiceResponse } from './dto/create-service-response.dto';
export declare class CreateServiceService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    createService(data: CreateServiceRequest): Promise<CreateServiceResponse>;
}
