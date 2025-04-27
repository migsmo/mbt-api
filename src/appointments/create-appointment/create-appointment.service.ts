import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { Appointments } from 'src/entity/appointments.entity';
import { BaseError } from 'src/errors/base-error';
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

    // Insert the appointment
    const appointment = await this.supabase
      .from('appointments')
      .insert([
        {
          date_time: appointmentTime.toISOString(),
          customer_assigned: request.customerId,
          selected_services: request.selectedServices, // Optional: keep for summary
          additional_remarks: request.additionalRemarks ?? '',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (appointment.error) throw new BaseError(appointment.error.message);

    const appointmentData = appointment.data as Appointments;

    // Insert into appointment_services table for each selected service
    const appointmentServicesToInsert = request.selectedServices.map(
      (serviceId) => ({
        appointment_id: appointmentData.id,
        service_id: serviceId,
        employee_ids: [], // Initially empty
      }),
    );

    const { error: appointmentServicesError } = await this.supabase
      .from('appointment_services')
      .insert(appointmentServicesToInsert);

    if (appointmentServicesError) {
      throw new BaseError(appointmentServicesError.message);
    }

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
