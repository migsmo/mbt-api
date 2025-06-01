import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { AppointmentBillings } from 'src/entity/appointment-billings.entity';
import { Appointments } from 'src/entity/appointments.entity';
import { BaseError } from 'src/errors/base-error';
import { UpdateAppointmentBillingsRequest } from './dto/update-appointment-billings-request.dto';
import { UpdateAppointmentBillingsResponse } from './dto/update-appointment-billings-response.dto';

@Injectable()
export class UpdateAppointmentBillingsService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async updateAppointmentBillings(
    request: UpdateAppointmentBillingsRequest,
  ): Promise<UpdateAppointmentBillingsResponse> {
    const { appointmentId, billingIds } = request;

    // Check if the appointment exists
    const appointment = await this.supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single();

    const appointmentData = appointment.data as Appointments;

    if (appointment.error || !appointmentData) {
      throw new BaseError('Appointment not found');
    }

    // Get all billings currently linked to this appointment
    const { data: currentBillings, error: billingsError } = await this.supabase
      .from('appointment_billings')
      .select('id, amount')
      .is('is_deleted', false)
      .eq('appointment_id', appointmentId);

    if (billingsError) {
      throw new BaseError('Failed to fetch current billings');
    }

    const currentBillingsData = currentBillings as AppointmentBillings[];

    const currentBillingIds = currentBillingsData.map((b) => b.id);

    console.log('currentBillingIds', currentBillingIds);

    // Find billings to remove (those currently linked but not in billingIds)
    const billingsToRemove = currentBillingIds.filter(
      (id) => !billingIds.includes(id),
    );

    console.log('billingsToRemove', billingsToRemove);

    // Calculate the total amount that was removed from billings
    let totalRemovedAmount = 0;

    currentBillingsData.forEach((billing) => {
      if (billingsToRemove.includes(billing.id)) {
        totalRemovedAmount += billing.amount;
      }
    });

    console.log('totalRemovedAmount', totalRemovedAmount);
    console.log('appointmentData.unpaid_amount', appointmentData.unpaid_amount);

    // Update the unpaid amount in the appointment
    await this.supabase
      .from('appointments')
      .update({
        unpaid_amount: appointmentData.unpaid_amount + totalRemovedAmount,
      })
      .eq('id', appointmentId);

    // delete billings in billingsToRemove
    if (billingsToRemove.length > 0) {
      const { error: unlinkError } = await this.supabase
        .from('appointment_billings')
        .update({ is_deleted: true })
        .in('id', billingsToRemove);

      if (unlinkError) {
        throw new BaseError('Failed to delete removed billings');
      }
    }

    // Fetch and return the updated billings
    const { data: updatedBillings, error: fetchError } = await this.supabase
      .from('appointment_billings')
      .select('*')
      .is('is_deleted', false)
      .eq('appointment_id', appointmentId);

    if (fetchError) {
      throw new BaseError('Failed to fetch updated billings');
    }

    return {
      appointmentId,
      updatedBillings: updatedBillings as AppointmentBillings[],
    };
  }
}
