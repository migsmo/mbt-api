import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Customers } from 'src/entity/customers.entity';
import { BaseError } from 'src/errors/base-error';

@Injectable()
export class CustomerHelper {
  async getCustomerById(supabase: SupabaseClient, customerId: string) {
    const customer = await supabase
      .from('customers')
      .select('*')
      .eq('id', customerId)
      .is('is_deleted', false)
      .single();

    if (customer.error) throw new BaseError(customer.error.message);

    const customerData = customer.data as Customers;

    return customerData;
  }
}
