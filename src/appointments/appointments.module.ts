// src/services/create-service.module.ts
import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { CreateAppointmentController } from './create-appointment/create-appointment.controller';
import { CreateAppointmentService } from './create-appointment/create-appointment.service';
import { GetAvailableDaySlotsController } from './get-available-day-slot/get-available-day-slots.controller';
import { GetAvailableDaySlotSService } from './get-available-day-slot/get-available-day-slots.service';

@Module({
  controllers: [CreateAppointmentController, GetAvailableDaySlotsController],
  providers: [
    SupabaseRequestProvider,
    CreateAppointmentService,
    GetAvailableDaySlotSService,
  ],
})
export class AppointmentsModule {}
