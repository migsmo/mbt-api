import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { Appointments } from 'src/entity/appointments.entity';
import { BaseError } from 'src/errors/base-error';
import { GetAppointmentResponse } from '../get-appointment/dto/get-appointment-response.dto';
import { GetAllAppointmentsResponse } from './dto/get-all-appointments-response.dto';
import { GetAllAppointmentsRequest } from './dto/get-all-appointments.request.dto';

@Injectable()
export class GetAllAppointmentsService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async getAllAppointments(
    request: GetAllAppointmentsRequest,
  ): Promise<GetAllAppointmentsResponse> {
    const { startDate, endDate } = request;
    const formattedStartDate = new Date(startDate);
    const formattedEndDate = new Date(endDate);

    formattedStartDate.setHours(0, 0, 0, 0);
    formattedEndDate.setHours(0, 0, 0, 0);

    if (
      isNaN(formattedStartDate.getTime()) ||
      isNaN(formattedEndDate.getTime())
    ) {
      throw new BaseError('Invalid day format.');
    }

    const { data: appointments, error } = await this.supabase
      .from('appointments')
      .select('*')
      .gte('date_time', formattedStartDate.toISOString())
      .lte('date_time', formattedEndDate.toISOString());

    if (error) throw new Error(error.message);

    const { count } = await this.supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .gte('date_time', formattedStartDate.toISOString())
      .lte('date_time', formattedEndDate.toISOString());

    const appointmentResponse = appointments.map((appointmentData) =>
      this.mapAppointmentData(appointmentData),
    );

    return {
      appointments: appointmentResponse,
      appointmentCount: count || 0,
    };
  }

  private mapAppointmentData(
    appointment: Appointments,
  ): GetAppointmentResponse {
    return {
      id: appointment.id,
      createdAt: new Date(appointment.created_at),
      dateTime: new Date(appointment.date_time),
      additionalRemarks: appointment.additional_remarks,
      selectedServices: appointment.selected_services,
      customerAssigned: appointment.customer_assigned,
    };
  }
}
