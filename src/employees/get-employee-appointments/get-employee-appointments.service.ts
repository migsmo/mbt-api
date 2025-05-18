import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
import { Appointments } from 'src/entity/appointments.entity';
import { AppointmentServices } from 'src/entity/appointmentService.entity';
import { Service } from 'src/entity/service.entity';
import { BaseError } from 'src/errors/base-error';
import { AppointmentsHelper } from 'src/helpers/appointments.helpers';
import { CustomerHelper } from 'src/helpers/customers.helper';
import { EmployeesHelper } from 'src/helpers/employees.helpers';
import { ServicesHelper } from 'src/helpers/services.helper';
import { GetEmployeeAppointmentsRequest } from './dto/get-employee-appointments.request.dto';
import {
  EmployeeAppointments,
  GetEmployeeAppointmentsResponse,
} from './dto/get-employee-appointments.response.dto';

@Injectable()
export class GetEmployeeAppointmentsService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
    @Inject(AppointmentsHelper)
    private readonly appointmentsHelper: AppointmentsHelper,
    @Inject(ServicesHelper)
    private readonly servicesHelper: ServicesHelper,
    @Inject(CustomerHelper)
    private readonly customerHelper: CustomerHelper,
    @Inject(EmployeesHelper)
    private readonly employeesHelper: EmployeesHelper,
  ) {}

  async getAllEmployeeAppointments(
    employeeId: string,
    params: GetEmployeeAppointmentsRequest,
  ): Promise<GetEmployeeAppointmentsResponse> {
    const { page, limit, sortDirection } = params;

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const appointmentService = await this.supabase
      .from('appointment_services')
      .select('*')
      .contains('employee_ids', [employeeId])
      .range(from, to);

    const appointmentServicesData =
      appointmentService.data as AppointmentServices[];

    if (appointmentService.error) {
      throw new BaseError(
        `Failed to get employee appointments: ${appointmentService.error.message}`,
      );
    }

    const appointmentIds = [
      ...new Set(
        appointmentServicesData.map((service) => service.appointment_id),
      ),
    ];

    const serviceIds = [
      ...new Set(appointmentServicesData.map((service) => service.service_id)),
    ];

    const services = await this.servicesHelper.getServicesByIds(
      this.supabase,
      serviceIds,
    );

    const appointments = await this.appointmentsHelper.getAppointmentByIds(
      this.supabase,
      appointmentIds,
      'date_time',
      sortDirection,
    );

    const formattedAppointments = await Promise.all(
      appointments.map((appointment) =>
        this.getAppointment(appointment, appointmentServicesData, services),
      ),
    );

    const { data: countData, error: countError } = await this.supabase
      .from('distinct_appointment_counts_per_employee')
      .select('appointment_count')
      .eq('employee_id', employeeId)
      .single();

    const count = countData?.appointment_count as number;

    if (countError) {
      throw new BaseError(
        `Failed to count employee appointments: ${countError.message}`,
      );
    }

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

    return {
      data: {
        employeeId: employeeId,
        appointments: formattedAppointments,
      },
      meta,
    };
  }

  async getAppointment(
    appointment: Appointments,
    appointmentServicesList: AppointmentServices[],
    services: Service[],
  ): Promise<EmployeeAppointments> {
    const selectedAppointmentService = appointmentServicesList.filter(
      (service) => service.appointment_id === appointment.id,
    );

    const serviceMap = new Map(services.map((s) => [s.id, s]));
    const serviceNames = selectedAppointmentService.map((service) => {
      const serviceData = serviceMap.get(service.service_id);

      return serviceData?.name || '';
    });

    const commissionRate =
      this.employeesHelper.calculateEmployeeCommissionByAppointmentServices(
        selectedAppointmentService,
        services,
      );

    const customer = await this.customerHelper.getCustomerById(
      this.supabase,
      appointment.customer_assigned,
    );

    return {
      appointmentId: appointment.id,
      appointmentDate: new Date(appointment.date_time),
      services: serviceNames,
      customerName: customer.first_name + ' ' + customer.last_name,
      commission: commissionRate.toNumber(),
    };
  }
}
