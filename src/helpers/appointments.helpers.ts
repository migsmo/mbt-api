import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Appointments } from 'src/entity/appointments.entity';
import { BaseError } from 'src/errors/base-error';

@Injectable()
export class AppointmentsHelper {
  async getAppointmentByStartAndEndDate(
    supabase: SupabaseClient,
    startDate: string,
    endDate: string,
  ) {
    const appointments = await supabase
      .from('appointments')
      .select('*')
      .gte('date_time', startDate)
      .lte('date_time', endDate);

    if (appointments.error) throw new BaseError(appointments.error.message);

    const appointmentsData = appointments.data as Appointments[];

    return appointmentsData;
  }

  async getAppointmentById(supabase: SupabaseClient, appointmentId: string) {
    const appointments = await supabase
      .from('appointments')
      .select('*')
      .eq('id', appointmentId)
      .single();

    if (appointments.error) throw new BaseError(appointments.error.message);

    const appointmentsData = appointments.data as Appointments;

    return appointmentsData;
  }

  async getAppointmentByIds(
    supabase: SupabaseClient,
    appointmentIds: string[],
    sortBy: string,
    sortDirection: 'asc' | 'desc',
  ) {
    const appointments = await supabase
      .from('appointments')
      .select('*')
      .in('id', appointmentIds)
      .order(sortBy, {
        ascending: sortDirection === 'asc',
      });

    if (appointments.error) throw new BaseError(appointments.error.message);

    const appointmentsData = appointments.data as Appointments[];

    return appointmentsData;
  }
}
