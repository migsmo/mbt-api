import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { BaseError } from 'src/errors/base-error';
import { Customers } from '../../entity/customers.entity';
import { CreateCustomerRequest } from './dto/create-customer-request.dto';
import { CreateCustomerResponse } from './dto/create-customer-response.dto';

@Injectable()
export class CreateCustomerService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async createCustomer(data: CreateCustomerRequest) {
    const customer = await this.supabase
      .from('customers')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        address: data.address,
        contact_no: data.contactNumber,
        email: data.email,
        occupation: data.occupation,
        additional_remarks: data.additionalRemarks,
      })
      .select()
      .single();

    const customerData = customer.data as Customers;

    if (customer.error) {
      throw new BaseError(
        `Failed to create customer: ${customer.error.message}`,
      );
    }

    const response: CreateCustomerResponse = {
      id: customerData.id,
      createdAt: new Date(customerData.created_at),
      firstName: customerData.first_name,
      lastName: customerData.last_name,
      address: customerData.address,
      contactNumber: customerData.contact_no,
      email: customerData.email,
      occupation: customerData.occupation,
      additionalRemarks: customerData.additional_remarks,
    };

    return response;
  }
}
