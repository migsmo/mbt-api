import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
import { Appointments } from 'src/entity/appointments.entity';
import { AppointmentServices } from 'src/entity/appointmentService.entity';
import { BaseError } from 'src/errors/base-error';
import { GetAppointmentResponse } from '../get-appointment/dto/get-appointment-response.dto';
import { GetAllAppointmentsByCustomerRequest } from './dto/get-all-appointments-by-customer.request.dto';
import { GetAllAppointmentsByCustomerResponse } from './dto/get-all-appointments-by-customer.response.dto';

type Appointment_AppointmentService = Appointments & {
  appointment_services: AppointmentServices[];
};
@Injectable()
export class GetAllAppointmentsByCustomerService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}
  async getAllAppointmentsByCustomer(
    customerId: string,
    params: GetAllAppointmentsByCustomerRequest,
  ): Promise<GetAllAppointmentsByCustomerResponse> {
    const { page, limit, sortBy, sortDirection } = params;

    // Calculate pagination parameters
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Get total count first (for pagination metadata)
    const { count, error: countError } = await this.supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true })
      .eq('customer_assigned', customerId);

    if (countError) {
      throw new BaseError(
        `Failed to count appointments: ${countError.message}`,
      );
    }

    // Get paginated data
    const { data, error } = await this.supabase
      .from('appointments')
      .select('*, appointment_services (*)')
      .eq('customer_assigned', customerId)
      .order(sortBy, { ascending: sortDirection === 'asc' })
      .range(from, to);

    const appointmentData = data as Appointment_AppointmentService[];

    if (error) {
      throw new BaseError(`Failed to get appointments: ${error.message}`);
    }

    // Map the service data to the response format
    const appointments = await Promise.all(
      appointmentData.map((appData) => this.mapAppointmentData(appData)),
    );

    // Calculate pagination metadata
    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / limit);

    const meta: PaginationMeta = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    const response: GetAllAppointmentsByCustomerResponse = {
      customerId: customerId,
      appointments: appointments,
      meta,
    };

    return response;
  }
  private mapAppointmentData(
    appointment: Appointment_AppointmentService,
  ): GetAppointmentResponse {
    const appointmentServiceData = appointment.appointment_services;

    const selectedServices = appointmentServiceData.map((service) => {
      return {
        serviceId: service.service_id,
        staffIds: service.employee_ids,
      };
    });

    return {
      id: appointment.id,
      createdAt: new Date(appointment.created_at),
      dateTime: new Date(appointment.date_time),
      additionalRemarks: appointment.additional_remarks,
      selectedServices: selectedServices,
      customerAssigned: appointment.customer_assigned,
      isCompleted: appointment.is_completed,
    };
  }
}
