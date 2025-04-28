import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { CreateEmployeeController } from './create-employee/create-employee.controller';
import { CreateEmployeeService } from './create-employee/create-employee.service';
import { GetAllEmployeesController } from './get-all-employees/get-all-employees.controller';
import { GetAllEmployeesService } from './get-all-employees/get-all-employees.service';

@Module({
  controllers: [GetAllEmployeesController, CreateEmployeeController],
  providers: [
    GetAllEmployeesService,
    SupabaseRequestProvider,
    CreateEmployeeService,
  ],
})
export class EmployeesModule {}
