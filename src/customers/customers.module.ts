import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { CreateCustomerController } from './create-customer/create-customer.controller';
import { CreateCustomerService } from './create-customer/create-customer.service';
import { DeletecustomersController } from './delete-customer/delete-customer.controller';
import { DeleteCustomerService } from './delete-customer/delete-customer.service';
import { GetAllCustomersController } from './get-all-customers/get-all-customers.controller';
import { GetAllCustomersService } from './get-all-customers/get-all-customers.service';
import { GetCustomerController } from './get-customer/get-customer.controller';
import { GetCustomerService } from './get-customer/get-customer.service';
import { UpdateCustomerController } from './update-customer/update-customer.controller';
import { UpdateCustomerService } from './update-customer/update-customer.service';

@Module({
  controllers: [
    GetAllCustomersController,
    GetCustomerController,
    CreateCustomerController,
    UpdateCustomerController,
    DeletecustomersController,
  ],
  providers: [
    GetAllCustomersService,
    SupabaseRequestProvider,
    GetCustomerService,
    CreateCustomerService,
    UpdateCustomerService,
    DeleteCustomerService,
  ],
})
export class CustomersModule {}
