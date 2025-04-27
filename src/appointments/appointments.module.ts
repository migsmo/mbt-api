// src/services/create-service.module.ts
import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { AssignStaffAppointmentsController } from './assign-staff-appointments/assign-staff-appointments.controller';
import { AssignStaffAppointmentsService } from './assign-staff-appointments/assign-staff-appointments.service';
import { CreateAppointmentController } from './create-appointment/create-appointment.controller';
import { CreateAppointmentService } from './create-appointment/create-appointment.service';
import { GetAllAppointmentsController } from './get-all-appointments/get-all-appointments.controller';
import { GetAllAppointmentsService } from './get-all-appointments/get-all-appointments.service';
import { GetAppointmentController } from './get-appointment/get-appointment.controller';
import { GetAppointmentService } from './get-appointment/get-appointment.service';
import { GetAvailableDaySlotsController } from './get-available-day-slot/get-available-day-slots.controller';
import { GetAvailableDaySlotSService } from './get-available-day-slot/get-available-day-slots.service';
import { UpdateAppointmentStatusController } from './update-appointment-status/update-appointment-status.controller';
import { UpdateAppointmentStatusService } from './update-appointment-status/update-appointment-status.service';

@Module({
  controllers: [
    CreateAppointmentController,
    GetAvailableDaySlotsController,
    GetAllAppointmentsController,
    GetAppointmentController,
    AssignStaffAppointmentsController,
    UpdateAppointmentStatusController,
  ],
  providers: [
    SupabaseRequestProvider,
    CreateAppointmentService,
    GetAvailableDaySlotSService,
    GetAllAppointmentsService,
    GetAppointmentService,
    AssignStaffAppointmentsService,
    UpdateAppointmentStatusService,
  ],
})
export class AppointmentsModule {}
