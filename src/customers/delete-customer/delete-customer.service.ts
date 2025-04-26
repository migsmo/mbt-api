import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { BaseError } from 'src/errors/base-error';
import { DeleteCustomerResponse } from './dto/delete-customer-response.dto';

@Injectable()
export class DeleteCustomerService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async deleteCustomer(id: string): Promise<DeleteCustomerResponse> {
    const { error } = await this.supabase
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) {
      throw new BaseError(`Failed to delete customer: ${error.message}`);
    }

    const response: DeleteCustomerResponse = {
      customerId: id,
      deleteSuccess: true,
    };

    return response;
  }
}
