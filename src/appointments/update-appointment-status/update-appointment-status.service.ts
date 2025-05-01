import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { Appointments } from 'src/entity/appointments.entity';
import { BaseError } from 'src/errors/base-error';
import { UpdateAppointmentStatusRequest } from './dto/update-appointment-status-request.dto';
import { UpdateAppointmentStatusResponse } from './dto/update-appointment-status-response.dto';

@Injectable()
export class UpdateAppointmentStatusService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async updateAppointmentStatus(
    request: UpdateAppointmentStatusRequest,
  ): Promise<UpdateAppointmentStatusResponse> {
    const { appointmentId, isCompleted } = request;
    const appointment = await this.supabase
      .from('appointments')
      .update({ is_completed: isCompleted })
      .eq('id', appointmentId)
      .select('*')
      .single();

    const appointmentData = appointment.data as Appointments;

    if (appointment.error) {
      throw new BaseError(
        `Failed to update appointment status: ${appointment.error.message}`,
      );
    }

    const response: UpdateAppointmentStatusResponse = {
      appointmentId: appointmentData.id,
      isCompleted: appointmentData.is_completed,
    };

    return response;
  }
}
