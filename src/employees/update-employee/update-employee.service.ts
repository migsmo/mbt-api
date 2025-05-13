import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Employees } from 'src/entity/employees.entity';
import { BaseError } from 'src/errors/base-error';
import { UpdateEmployeeRequest } from './dto/update-employee-request.dto';
import { UpdateEmployeeResponse } from './dto/update-employee-response.dto';

@Injectable()
export class UpdateEmployeeService {
  constructor(
    @Inject('SUPABASE_REQUEST_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async updateEmployee(
    request: UpdateEmployeeRequest,
  ): Promise<UpdateEmployeeResponse> {
    const updateEmployee = {
      id: request.employeeId,
      first_name: request.firstName,
      last_name: request.lastName,
      email: request.email,
      contact_no: request.contactNumber,
    };

    const employee = await this.supabase
      .from('employees')
      .update(updateEmployee)
      .eq('id', updateEmployee.id)
      .is('is_deleted', false)
      .select()
      .single();

    const employeeData = employee.data as Employees;

    if (employee.error) {
      throw new BaseError(
        `Failed to update employee: ${employee.error.message}`,
      );
    }

    const response: UpdateEmployeeResponse = {
      employeeId: employeeData.id,
      firstName: employeeData.first_name,
      lastName: employeeData.last_name,
      email: employeeData.email,
      contactNumber: employeeData.contact_no,
    };

    return response;
  }
}
