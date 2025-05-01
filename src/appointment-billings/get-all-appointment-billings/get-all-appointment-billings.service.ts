import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { AppointmentBillings } from 'src/entity/appointmentBillings.entity';
import { BaseError } from 'src/errors/base-error';
import { GetAllAppointmentBillingsResponse } from './dto/get-all-appointment-billings-response.dto';

@Injectable()
export class GetAllAppointmentBillingsService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async getAllAppointmentBillings(
    appointmentId: string,
  ): Promise<GetAllAppointmentBillingsResponse> {
    const appointmentBillings = await this.supabase
      .from('appointment_billings')
      .select('*')
      .eq('appointment_id', appointmentId);

    if (appointmentBillings.error?.message) {
      throw new BaseError(appointmentBillings.error?.message);
    }

    const appointmentBillingsData =
      appointmentBillings.data as AppointmentBillings[];

    const appointmentBillingsFormatted = appointmentBillingsData.map(
      (billing) => ({
        appointmentBillingId: billing.id,
        appointmentId: billing.appointment_id,
        datePaid: billing.date_paid,
        paymentType: billing.payment_type,
        amount: billing.amount,
      }),
    );

    const response: GetAllAppointmentBillingsResponse = {
      appointmentBillings: appointmentBillingsFormatted,
    };

    return response;
  }
}
