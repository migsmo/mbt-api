import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
import { Employees } from 'src/entity/employees.entity';
import { BaseError } from 'src/errors/base-error';
import { EmployeesHelper } from 'src/helpers/employees.helpers';
import { GetEmployeeResponse } from '../get-employee/dto/get-empoyee-response.dto';
import { GetAllEmployeesRequest } from './dto/get-all-employees-request.dto';
import { GetAllEmployeesResponse } from './dto/get-all-employees-response.dto';

@Injectable()
export class GetAllEmployeesService {
  constructor(
    @Inject('SUPABASE_REQUEST_CLIENT')
    private readonly supabase: SupabaseClient,
    @Inject(EmployeesHelper)
    private readonly employeesHelper: EmployeesHelper,
  ) {}

  async getAllEmployees(
    params: GetAllEmployeesRequest,
  ): Promise<GetAllEmployeesResponse> {
    const { page, limit, sortBy, sortDirection, search } = params;

    // Get total count first (for pagination metadata)
    const { count, error: countError } = await this.supabase
      .from('employees')
      .select('*', { count: 'exact', head: true })
      .is('is_deleted', false);

    if (countError) {
      throw new BaseError(`Failed to count employees: ${countError.message}`);
    }

    const query = this.supabase
      .from('employees')
      .select('*')
      .is('is_deleted', false);

    if (search) {
      query.ilike('full_name', `%${search}%`);
    }

    let queryResult;

    if (limit > 0) {
      // Calculate pagination parameters
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      queryResult = await query
        .order(sortBy, { ascending: sortDirection === 'asc' })
        .range(from, to);
    } else {
      queryResult = await query.order(sortBy, {
        ascending: sortDirection === 'asc',
      });
    }

    const { data, error } = queryResult;

    // Map the service data to the response format
    const employees = await Promise.all(
      (data as Employees[]).map((employeesData) =>
        this.mapEmployeeData(employeesData),
      ),
    );

    if (error) {
      throw new BaseError(`Failed to get services: ${error.message}`);
    }

    // Calculate pagination metadata
    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / limit);

    const meta: PaginationMeta = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return {
      employees,
      meta,
    };
  }

  private async mapEmployeeData(
    employeeData: Employees,
  ): Promise<GetEmployeeResponse> {
    const commission = await this.employeesHelper.getEmployeeCommission(
      this.supabase,
      employeeData.id,
      new Date().getFullYear(),
      new Date().getMonth() + 1,
    );

    const employee: GetEmployeeResponse = {
      id: employeeData.id,
      createdAt: new Date(employeeData.created_at),
      firstName: employeeData.first_name,
      lastName: employeeData.last_name,
      commission: commission.toNumber(),
    };

    if (employeeData.contact_no) {
      employee.contactNumber = employeeData.contact_no;
    }
    if (employeeData.email) {
      employee.email = employeeData.email;
    }

    return employee;
  }
}
