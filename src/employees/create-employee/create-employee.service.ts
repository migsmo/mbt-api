import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { Employees } from 'src/entity/employees.entity';
import { CreateEmployeeRequest } from './dto/create-employee-request.dto';
import { CreateEmployeeResponse } from './dto/create-employee-response.dto';

@Injectable()
export class CreateEmployeeService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async createEmployee(request: CreateEmployeeRequest) {
    const { firstName, lastName, email, contactNumber } = request;

    const employee = await this.supabase
      .from('employees')
      .insert({
        first_name: firstName,
        last_name: lastName,
        email: email,
        contact_number: contactNumber,
      })
      .select('*')
      .single();

    const employeeData = employee.data as Employees;

    if (employee.error) {
      throw new Error(`Failed to create employee: ${employee.error.message}`);
    }

    const data: CreateEmployeeResponse = {
      id: employeeData.id,
      firstName: employeeData.first_name,
      lastName: employeeData.last_name,
      email: employeeData.email,
      contactNumber: employeeData.contact_no,
      createdAt: new Date(employeeData.created_at),
    };

    return data;
  }
}
