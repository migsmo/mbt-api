import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { BaseError } from 'src/errors/base-error';
import { Appointment } from 'src/services/entity/appointments.entity';
import { CreateAppointmentRequest } from './dto/create-appointment-request.dto';
import { CreateAppointmentResponse } from './dto/create-appointment-response.dto';

@Injectable()
export class CreateAppointmentService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async createAppointment(request: CreateAppointmentRequest) {
    const appointmentTime = new Date(request.dateTime);
    const now = new Date();

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);

    if (isNaN(appointmentTime.getTime())) {
      throw new BaseError('Invalid day format.');
    }

    console.log(appointmentTime);
    // Time and date constraints
    if (appointmentTime < now || appointmentTime > maxDate) {
      throw new BaseError('Appointment must be within 3 months from today.');
    }

    const hour = appointmentTime.getHours();
    const minute = appointmentTime.getMinutes();

    if (hour < 10 || hour >= 22 || (minute !== 0 && minute !== 30)) {
      throw new BaseError(
        'Appointments are only allowed between 10:00 AM and 10:00 PM in 30-minute intervals.',
      );
    }

    // Check slot availability
    const { data: existingAppointments, error } = await this.supabase
      .from('appointments')
      .select('id')
      .eq('date_time', appointmentTime.toISOString());

    if (error) throw new Error(error.message);
    if (existingAppointments.length >= 4) {
      throw new BaseError('This time slot is fully booked.');
    }

    console.log();

    // Insert appointment
    const appointment = await this.supabase
      .from('appointments')
      .insert([
        {
          date_time: appointmentTime.toISOString(),
          customer_assigned: request.customerId,
          selected_services: request.selectedServices,
          additional_remarks: request.additionalRemarks ?? '',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    console.log({
      date_time: appointmentTime.toISOString(),
      customer_assigned: request.customerId,
      selected_services: request.selectedServices,
      additional_remarks: request.additionalRemarks ?? '',
      created_at: new Date().toISOString(),
    });

    if (appointment.error) throw new BaseError(appointment.error.message);

    const appointmentData = appointment.data as Appointment;

    const response: CreateAppointmentResponse = {
      appointmentId: appointmentData.id,
      dateTime: appointmentTime.toISOString(),
      customerId: request.customerId,
      selectedServices: request.selectedServices,
      additionalRemarks: request.additionalRemarks ?? '',
      status: 'pending', // Default status
      createdAt: new Date(appointmentData.created_at),
    };

    return response;
  }
}
