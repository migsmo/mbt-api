// src/services/create-service.module.ts
import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { AppointmentsHelper } from 'src/helpers/appointments.helpers';
import { AssignStaffAppointmentsController } from './assign-staff-appointments/assign-staff-appointments.controller';
import { AssignStaffAppointmentsService } from './assign-staff-appointments/assign-staff-appointments.service';
import { CreateAppointmentController } from './create-appointment/create-appointment.controller';
import { CreateAppointmentService } from './create-appointment/create-appointment.service';
import { DownloadAppointmentFilesController } from './download-appointment-files/download-appointment-files.controller';
import { DownloadAppointmentFilesService } from './download-appointment-files/download-appointmnet-files.service';
import { GetAllAppointmentsByCustomerController } from './get-all-appointments-by-customer/get-all-appointments-by-customer.controller';
import { GetAllAppointmentsByCustomerService } from './get-all-appointments-by-customer/get-all-appointments-by-customer.service';
import { GetAllAppointmentsController } from './get-all-appointments/get-all-appointments.controller';
import { GetAllAppointmentsService } from './get-all-appointments/get-all-appointments.service';
import { GetAppointmentController } from './get-appointment/get-appointment.controller';
import { GetAppointmentService } from './get-appointment/get-appointment.service';
import { GetAvailableDaySlotsController } from './get-available-day-slot/get-available-day-slots.controller';
import { GetAvailableDaySlotSService } from './get-available-day-slot/get-available-day-slots.service';
import { RetrieveAppointmentFilesController } from './retrieve-appointment-files/retrieve-appointment-files.controller';
import { RetrieveAppointmentFilesService } from './retrieve-appointment-files/retrieve-appointment-files.service';
import { UpdateAppointmentStatusController } from './update-appointment-status/update-appointment-status.controller';
import { UpdateAppointmentStatusService } from './update-appointment-status/update-appointment-status.service';
import { UploadAppointmentFilesController } from './upload-appointment-files/upload-appointment-files.controller';
import { UploadAppointmentFilesService } from './upload-appointment-files/upload-appointment-files.service';

@Module({
  controllers: [
    CreateAppointmentController,
    GetAvailableDaySlotsController,
    GetAllAppointmentsController,
    GetAppointmentController,
    AssignStaffAppointmentsController,
    UpdateAppointmentStatusController,
    GetAllAppointmentsByCustomerController,
    UploadAppointmentFilesController,
    RetrieveAppointmentFilesController,
    DownloadAppointmentFilesController,
  ],
  providers: [
    SupabaseRequestProvider,
    CreateAppointmentService,
    GetAvailableDaySlotSService,
    GetAllAppointmentsService,
    GetAppointmentService,
    AssignStaffAppointmentsService,
    UpdateAppointmentStatusService,
    GetAllAppointmentsService,
    GetAllAppointmentsByCustomerService,
    UploadAppointmentFilesService,
    AppointmentsHelper,
    RetrieveAppointmentFilesService,
    DownloadAppointmentFilesService,
  ],
})
export class AppointmentsModule {}
