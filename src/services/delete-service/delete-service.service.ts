import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { BaseError } from 'src/errors/base-error';
import { DeleteServiceResponse } from './dto/delete-service-response.dto';

@Injectable()
export class DeleteServiceService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async deleteService(id: string): Promise<DeleteServiceResponse> {
    const { error } = await this.supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) {
      throw new BaseError(`Failed to delete service: ${error.message}`);
    }

    const response: DeleteServiceResponse = {
      serviceId: id,
      deleteSuccess: true,
    };

    return response;
  }
}
