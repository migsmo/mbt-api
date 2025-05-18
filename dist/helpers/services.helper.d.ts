import { SupabaseClient } from '@supabase/supabase-js';
import { Service } from 'src/entity/service.entity';
export declare class ServicesHelper {
    getServiceById(supabase: SupabaseClient, serviceId: string): Promise<Service>;
    getServicesByIds(supabase: SupabaseClient, serviceIds: string[]): Promise<Service[]>;
}
