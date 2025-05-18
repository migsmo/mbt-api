import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { AppointmentsHelper } from 'src/helpers/appointments.helpers';
import { CustomerHelper } from 'src/helpers/customers.helper';
import { EmployeesHelper } from 'src/helpers/employees.helpers';
import { ServicesHelper } from 'src/helpers/services.helper';
import { CreateEmployeeController } from './create-employee/create-employee.controller';
import { CreateEmployeeService } from './create-employee/create-employee.service';
import { DeleteEmployeeController } from './delete-employee/delete-employee.controller';
import { DeleteEmployeeService } from './delete-employee/delete-employee.service';
import { GetAllEmployeesController } from './get-all-employees/get-all-employees.controller';
import { GetAllEmployeesService } from './get-all-employees/get-all-employees.service';
import { GetEmployeeAppointmentsController } from './get-employee-appointments/get-employee-appointments.controller';
import { GetEmployeeAppointmentsService } from './get-employee-appointments/get-employee-appointments.service';
import { GetEmployeeController } from './get-employee/get-employee.controller';
import { GetEmployeeService } from './get-employee/get-employee.service';
import { UpdateEmployeeController } from './update-employee/update-employee.controller';
import { UpdateEmployeeService } from './update-employee/update-employee.service';

@Module({
  controllers: [
    GetAllEmployeesController,
    CreateEmployeeController,
    GetEmployeeController,
    UpdateEmployeeController,
    DeleteEmployeeController,
    GetEmployeeAppointmentsController,
  ],
  providers: [
    GetAllEmployeesService,
    SupabaseRequestProvider,
    CreateEmployeeService,
    GetEmployeeService,
    UpdateEmployeeService,
    DeleteEmployeeService,
    GetEmployeeAppointmentsService,
    GetEmployeeService,
    AppointmentsHelper,
    EmployeesHelper,
    ServicesHelper,
    CustomerHelper,
  ],
})
export class EmployeesModule {}
