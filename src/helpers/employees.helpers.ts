import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import Decimal from 'decimal.js';
import { AppointmentServices } from 'src/entity/appointmentService.entity';
import { Service } from 'src/entity/service.entity';
import { AppointmentsHelper } from './appointments.helpers';

@Injectable()
export class EmployeesHelper {
  constructor(
    @Inject(AppointmentsHelper)
    private readonly appointmentsHelper: AppointmentsHelper,
  ) {}

  async getEmployeeCommission(
    supabase: SupabaseClient,
    employeeId: string,
    year: number,
    month: number,
  ): Promise<Decimal> {
    const startDate = new Date(year, month - 1, 1).toISOString();
    const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();

    const appointments =
      await this.appointmentsHelper.getAppointmentByStartAndEndDate(
        supabase,
        startDate,
        endDate,
      );

    const validAppointments = appointments.filter((a) => !a.is_cancelled);
    const appointmentIds = validAppointments.map((a) => a.id);

    if (appointmentIds.length === 0) return new Decimal(0);

    const appointmentServices = await supabase
      .from('appointment_services')
      .select('appointment_id, service_id, employee_ids')
      .in('appointment_id', appointmentIds)
      .contains('employee_ids', [employeeId]);

    const appointmentServicesData =
      appointmentServices.data as AppointmentServices[];

    if (appointmentServices.error)
      throw new Error(appointmentServices.error.message);

    if (appointmentServicesData.length === 0) return new Decimal(0);

    const serviceIds = appointmentServicesData.map((s) => s.service_id);

    const services = await supabase
      .from('services')
      .select('id, price, commission_rate')
      .in('id', serviceIds);

    const servicesData = services.data as Service[];

    if (services.error) throw new Error(services.error.message);

    const totalCommission =
      this.calculateEmployeeCommissionByAppointmentServices(
        appointmentServicesData,
        servicesData,
      );

    return totalCommission;
  }

  calculateEmployeeCommissionByAppointmentServices(
    appointmentServicesData: AppointmentServices[],
    servicesData: Service[],
  ): Decimal {
    const serviceMap = new Map(servicesData.map((s) => [s.id, s]));

    let totalCommission = new Decimal(0);

    for (const svc of appointmentServicesData) {
      const service = serviceMap.get(svc.service_id);
      if (!service) continue;

      const price = new Decimal(Number(service.price));
      const commissionRate = new Decimal(Number(service.commission_rate));

      const numEmployees = svc.employee_ids.length || 1;
      const commission = new Decimal(price)
        .mul(commissionRate)
        .div(numEmployees);

      totalCommission = totalCommission.add(commission);
    }

    return totalCommission;
  }
}
