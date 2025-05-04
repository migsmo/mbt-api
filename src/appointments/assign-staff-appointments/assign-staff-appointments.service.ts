import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { Appointments } from 'src/entity/appointments.entity';
import { AppointmentServices } from 'src/entity/appointmentService.entity';
import { Employees } from 'src/entity/employees.entity';
import { BaseError } from 'src/errors/base-error';
import { AssignStaffAppointmentsRequestDto } from './dto/assign-staff-appointments-request.dto';
import { AssignStaffAppointmentsResponse } from './dto/assign-staff-appointments-response.dto';

@Injectable()
export class AssignStaffAppointmentsService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async assignStaffToAppointments(
    request: AssignStaffAppointmentsRequestDto,
  ): Promise<AssignStaffAppointmentsResponse> {
    const { appointmentId, staffIds } = request;

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

    for (const staffId of staffIds) {
      const staffMember = await this.findStaffById(staffId);
      if (!staffMember) {
        throw new BaseError(`Staff member with ID ${staffId} not found`);
      }
    }

    const appointmentService = await this.supabase
      .from('appointment_services')
      .select('*')
      .eq('appointment_id', appointmentId)
      .eq('service_id', request.serviceId)
      .single();

    const appointmentServiceData =
      appointmentService.data as AppointmentServices;

    if (appointmentService.error || !appointmentServiceData) {
      throw new BaseError(
        'Failed to find appointment services',
        appointmentService.error?.message,
      );
    }

    const updatedAppointmentService = await this.supabase
      .from('appointment_services')
      .update({
        employee_ids: staffIds,
      })
      .eq('id', appointmentServiceData.id)
      .select()
      .single();

    const updatedAppointmentServiceData =
      updatedAppointmentService.data as AppointmentServices;

    if (updatedAppointmentService.error) {
      throw new BaseError(
        'Failed to assign staff to appointment',
        updatedAppointmentService.error.message,
      );
    }

    const response: AssignStaffAppointmentsResponse = {
      appointmentId: updatedAppointmentServiceData.appointment_id,
      staffIds: updatedAppointmentServiceData.employee_ids,
      serviceId: updatedAppointmentServiceData.service_id,
    };

    return response;
  }

  private async findStaffById(staffId: string) {
    const staff = await this.supabase
      .from('employees')
      .select('*')
      .eq('id', staffId)
      .single();

    const staffData = staff.data as Employees;

    if (staff.error || !staffData) {
      throw new BaseError('Staff not found');
    }

    return staffData;
  }
}
