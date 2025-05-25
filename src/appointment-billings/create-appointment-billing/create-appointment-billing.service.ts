import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { AppointmentBillings } from 'src/entity/appointmentBillings.entity';
import { Appointments } from 'src/entity/appointments.entity';
import { BaseError } from 'src/errors/base-error';
import { CreateAppointmentBillingRequest } from './dto/create-appointment-billing-request.dto';
import { CreateAppointmentBillingResponse } from './dto/create-appointment-billing-response.dto';

@Injectable()
export class CreateAppointmentBillingService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async createAppointmentBilling(
    request: CreateAppointmentBillingRequest,
  ): Promise<CreateAppointmentBillingResponse> {
    const { appointmentId, datePaid, paymentType, amount } = request;

    const dateUTC = new Date(datePaid);

    const appointment = await this.supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single();

    const appointmentData = appointment.data as Appointments;

    if (!appointmentData || appointment.error?.message) {
      throw new BaseError('Appointment not found');
    }

    const appointmentBillings = await this.supabase.rpc(
      'insert_appointment_billing_and_update_appointment',
      {
        app_id: appointmentId,
        date_paid: dateUTC.toISOString(),
        payment_type: paymentType,
        amount: amount,
      },
    );

    console.log(appointmentBillings);
    const billingData = appointmentBillings.data as AppointmentBillings;

    if (appointmentBillings.error)
      throw new BaseError(appointmentBillings.error.message);

    const data: CreateAppointmentBillingResponse = {
      appointmentBillingId: billingData.id,
      appointmentId: billingData.appointment_id,
      datePaid: new Date(billingData.date_paid),
      paymentType: billingData.payment_type,
      amount: billingData.amount,
    };

    return data;
  }
}
