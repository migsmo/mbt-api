import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { BaseError } from 'src/errors/base-error';
import { DeleteEmployeeResponse } from './dto/delete-employee-response,dto';

@Injectable()
export class DeleteEmployeeService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async deleteEmployee(id: string): Promise<DeleteEmployeeResponse> {
    const { error } = await this.supabase
      .from('employees')
      .update({ is_deleted: true })
      .eq('id', id);

    if (error) {
      throw new BaseError(`Failed to delete employee: ${error.message}`);
    }

    const response: DeleteEmployeeResponse = {
      employeeId: id,
      deleteSuccess: true,
    };

    return response;
  }
}
