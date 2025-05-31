import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { Appointments } from 'src/entity/appointments.entity';
import { AppointmentServices } from 'src/entity/appointmentService.entity';
import { BaseError } from 'src/errors/base-error';
import { GetAppointmentResponse } from './dto/get-appointment-response.dto';

@Injectable()
export class GetAppointmentService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async getAppointmentById(id: string) {
    const appointment = await this.supabase
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    const appointmentData = appointment.data as Appointments;

    if (appointment.error) {
      throw new BaseError(
        `Failed to get appointment: ${appointment.error.message}`,
      );
    }

    const appointmentService = await this.supabase
      .from('appointment_services')
      .select('*')
      .eq('appointment_id', appointmentData.id);

    const appointmentServiceData =
      appointmentService.data as AppointmentServices[];

    const selectedServices = appointmentServiceData.map((service) => {
      return {
        serviceId: service.service_id,
        staffIds: service.employee_ids,
      };
    });

    const response: GetAppointmentResponse = {
      id: appointmentData.id,
      createdAt: new Date(appointmentData.created_at),
      dateTime: new Date(appointmentData.date_time),
      additionalRemarks: appointmentData.additional_remarks,
      selectedServices: selectedServices,
      customerAssigned: appointmentData.customer_assigned,
      isCompleted: appointmentData.is_completed,
      unpaidAmount: appointmentData.unpaid_amount,
    };

    return response;
  }
}
