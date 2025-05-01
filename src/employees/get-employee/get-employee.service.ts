import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { Employees } from 'src/entity/employees.entity';
import { EmployeesHelper } from 'src/helpers/employees.helpers';
import { GetEmployeeResponse } from './dto/get-empoyee-response.dto';
@Injectable()
export class GetEmployeeService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
    @Inject(EmployeesHelper)
    private readonly employeesHelper: EmployeesHelper,
  ) {}

  async getEmployee(id: string): Promise<GetEmployeeResponse> {
    const employee = await this.supabase
      .from('employees')
      .select('*')
      .eq('id', id)
      .single();

    const employeeData = employee.data as Employees;

    if (employee.error) {
      throw new Error(employee.error.message);
    }

    const commission = await this.employeesHelper.getEmployeeCommission(
      this.supabase,
      employeeData.id,
      new Date().getFullYear(),
      new Date().getMonth() + 1,
    );

    const data: GetEmployeeResponse = {
      id: employeeData.id,
      firstName: employeeData.first_name,
      lastName: employeeData.last_name,
      contactNumber: employeeData.contact_no,
      email: employeeData.email,
      createdAt: new Date(employeeData.created_at),
      commission: commission.toNumber(),
    };

    return data;
  }
}
