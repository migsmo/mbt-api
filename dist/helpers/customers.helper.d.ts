import { SupabaseClient } from '@supabase/supabase-js';
import { Customers } from 'src/entity/customers.entity';
export declare class CustomerHelper {
    getCustomerById(supabase: SupabaseClient, customerId: string): Promise<Customers>;
}
