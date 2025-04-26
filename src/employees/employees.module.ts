import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { GetAllEmployeesController } from './get-all-employees/get-all-employees.controller';
import { GetAllEmployeesService } from './get-all-employees/get-all-employees.service';

@Module({
  controllers: [GetAllEmployeesController],
  providers: [GetAllEmployeesService, SupabaseRequestProvider],
})
export class EmployeesModule {}
