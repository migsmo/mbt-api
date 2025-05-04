import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { AppointmentsHelper } from 'src/helpers/appointments.helpers';
import { EmployeesHelper } from 'src/helpers/employees.helpers';
import { CreateEmployeeController } from './create-employee/create-employee.controller';
import { CreateEmployeeService } from './create-employee/create-employee.service';
import { GetAllEmployeesController } from './get-all-employees/get-all-employees.controller';
import { GetAllEmployeesService } from './get-all-employees/get-all-employees.service';
import { GetEmployeeController } from './get-employee/get-employee.controller';
import { GetEmployeeService } from './get-employee/get-employee.service';

@Module({
  controllers: [
    GetAllEmployeesController,
    CreateEmployeeController,
    GetEmployeeController,
  ],
  providers: [
    GetAllEmployeesService,
    SupabaseRequestProvider,
    CreateEmployeeService,
    GetEmployeeService,
    AppointmentsHelper,
    EmployeesHelper,
  ],
})
export class EmployeesModule {}
