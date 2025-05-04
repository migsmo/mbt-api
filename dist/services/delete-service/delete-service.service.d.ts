import { SupabaseClient } from '@supabase/supabase-js';
import { DeleteServiceResponse } from './dto/delete-service-response.dto';
export declare class DeleteServiceService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    deleteService(id: string): Promise<DeleteServiceResponse>;
}
