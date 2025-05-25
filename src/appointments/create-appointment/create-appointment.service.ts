import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { Appointments } from 'src/entity/appointments.entity';
import { Service } from 'src/entity/service.entity';
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
    const TIMEZONE = 'Asia/Manila';

    // Parse client-provided datetime as UTC, then convert to Manila time
    const appointmentUtc = new Date(request.dateTime);
    const appointmentTimePH = toZonedTime(appointmentUtc, TIMEZONE);

    if (isNaN(appointmentTimePH.getTime())) {
      throw new BaseError('Invalid day format.');
    }

    // Manila "now" and "maxDate"
    const nowPH = toZonedTime(new Date(), TIMEZONE);
    const maxDatePH = new Date(nowPH);
    maxDatePH.setMonth(maxDatePH.getMonth() + 3);
    maxDatePH.setHours(0, 0, 0, 0);

    // Time and date constraints
    if (appointmentTimePH < nowPH || appointmentTimePH > maxDatePH) {
      throw new BaseError('Appointment must be within 3 months from today.');
    }

    // Check business hours
    const hour = appointmentTimePH.getHours();
    const minute = appointmentTimePH.getMinutes();

    if (hour < 10 || hour >= 22 || (minute !== 0 && minute !== 30)) {
      throw new BaseError(
        'Appointments are only allowed between 10:00 AM and 10:00 PM in 30-minute intervals.',
      );
    }

    // Check slot availability (store in UTC in DB)
    const appointmentUTCString = fromZonedTime(
      appointmentTimePH,
      TIMEZONE,
    ).toISOString();

    const { data: existingAppointments, error } = await this.supabase
      .from('appointments')
      .select('id')
      .eq('date_time', appointmentUTCString);

    if (error) throw new Error(error.message);
    if (existingAppointments.length >= 4) {
      throw new BaseError('This time slot is fully booked.');
    }

    let appointmentTotalCost = 0;
    for (const serviceId of request.selectedServices) {
      const service = await this.checkServiceIsReal(serviceId);
      appointmentTotalCost += service.price;
    }

    const createdAtUTC = new Date().toISOString();

    // Insert appointment
    const appointment = await this.supabase
      .from('appointments')
      .insert([
        {
          date_time: appointmentUTCString,
          customer_assigned: request.customerId,
          selected_services: request.selectedServices,
          additional_remarks: request.additionalRemarks ?? '',
          created_at: createdAtUTC,
          unpaid_amount: appointmentTotalCost,
        },
      ])
      .select()
      .single();

    if (appointment.error) throw new BaseError(appointment.error.message);

    const appointmentData = appointment.data as Appointments;

    // Insert appointment_services
    const appointmentServicesToInsert = request.selectedServices.map(
      (serviceId) => ({
        appointment_id: appointmentData.id,
        service_id: serviceId,
        employee_ids: [],
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
      dateTime: appointmentUTCString,
      customerId: request.customerId,
      selectedServices: request.selectedServices,
      additionalRemarks: request.additionalRemarks ?? '',
      status: 'pending',
      createdAt: new Date(appointmentData.created_at),
    };

    return response;
  }

  async checkServiceIsReal(serviceId: string) {
    const service = await this.supabase
      .from('services')
      .select('*')
      .eq('id', serviceId)
      .single();

    const serviceData = service.data as Service;

    if (service.error) {
      throw new BaseError(`Failed to get service: ${service.error.message}`);
    }

    return serviceData;
  }
}
