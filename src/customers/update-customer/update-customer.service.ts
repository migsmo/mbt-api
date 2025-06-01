import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { Appointments } from 'src/entity/appointments.entity';
import { BaseError } from 'src/errors/base-error';
import { Customers } from '../../entity/customers.entity';
import { UpdateCustomerRequest } from './dto/update-customer-request.dto';
import { UpdateCustomerResponse } from './dto/update-customer-response.dto';

@Injectable()
export class UpdateCustomerService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async updateCustomer(request: UpdateCustomerRequest) {
    const updateRequest = {
      first_name: request.firstName,
      last_name: request.lastName,
      address: request.address,
      contact_no: request.contactNumber,
      email: request.email,
      occupation: request.occupation,
      additional_remarks: request.additionalRemarks,
    };

    const customer = await this.supabase
      .from('customers')
      .update(updateRequest)
      .eq('id', request.id)
      .is('is_deleted', false)
      .select()
      .single();

    const customerData = customer.data as Customers;

    if (customer.error) {
      throw new BaseError(
        `Failed to update customer: ${customer.error.message}`,
      );
    }

    const appointments = await this.supabase
      .from('appointments')
      .select('id, unpaid_amount')
      .eq('customer_assigned', request.id)
      .is('is_cancelled', false);

    const appointmentData = appointments.data as Appointments[];

    let outstandingBalance = 0;

    if (appointmentData.length > 0) {
      appointmentData.forEach((appointment) => {
        outstandingBalance += appointment.unpaid_amount;
      });
    }

    const response: UpdateCustomerResponse = {
      id: customerData.id,
      createdAt: new Date(customerData.created_at),
      firstName: customerData.first_name,
      lastName: customerData.last_name,
      address: customerData.address,
      contactNumber: customerData.contact_no,
      email: customerData.email,
      occupation: customerData.occupation,
      additionalRemarks: customerData.additional_remarks,
      outstandingBalance: outstandingBalance || 0,
    };

    return response;
  }
}
