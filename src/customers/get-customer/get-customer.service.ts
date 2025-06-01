import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Appointments } from 'src/entity/appointments.entity';
import { Customers } from 'src/entity/customers.entity';
import { BaseError } from 'src/errors/base-error';
import { GetCustomerResponse } from '../get-customer/dto/get-customer-response.dto';

@Injectable()
export class GetCustomerService {
  constructor(
    @Inject('SUPABASE_REQUEST_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getCustomerById(id: string) {
    const customer = await this.supabase
      .from('customers')
      .select('*')
      .eq('id', id)
      .is('is_deleted', false)
      .single();

    const customerData = customer.data as Customers;

    if (customer.error) {
      throw new BaseError(`Failed to get customer: ${customer.error.message}`);
    }

    const appointments = await this.supabase
      .from('appointments')
      .select('id, unpaid_amount')
      .eq('customer_assigned', id)
      .is('is_cancelled', false);

    const appointmentData = appointments.data as Appointments[];

    let outstandingBalance = 0;

    if (appointmentData.length > 0) {
      appointmentData.forEach((appointment) => {
        outstandingBalance += appointment.unpaid_amount;
      });
    }

    const response: GetCustomerResponse = {
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
