import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { GetAllCustomersController } from './get-all-customers/get-all-customers.controller';
import { GetAllCustomersService } from './get-all-customers/get-all-customers.service';
import { GetCustomerController } from './get-customer/get-customer.controller';
import { GetCustomerService } from './get-customer/get-customer.service';

@Module({
  controllers: [GetAllCustomersController, GetCustomerController],
  providers: [
    GetAllCustomersService,
    SupabaseRequestProvider,
    GetCustomerService,
  ],
})
export class CustomersModule {}
