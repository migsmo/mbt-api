import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { GetAllCustomersController } from './get-all-customers/get-all-customers.controller';
import { GetAllCustomersService } from './get-all-customers/get-all-customers.service';

@Module({
  controllers: [GetAllCustomersController],
  providers: [GetAllCustomersService, SupabaseRequestProvider],
})
export class CustomersModule {}
