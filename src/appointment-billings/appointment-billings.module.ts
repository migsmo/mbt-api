import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { CreateAppointmentBillingService } from './create-appointment-billing/create-appointment-billing.service';
import { CreateAppointmentBillingController } from './create-appointment-billing/create-appointment-billings.controller';
import { GetAllAppointmentBillingsController } from './get-all-appointment-billings/get-all-appointment-billings.controller';
import { GetAllAppointmentBillingsService } from './get-all-appointment-billings/get-all-appointment-billings.service';
import { UpdateAppointmentBillingsController } from './update-appointment-billings/update-appointment-billings.controller';
import { UpdateAppointmentBillingsService } from './update-appointment-billings/update-appointment-billings.service';

@Module({
  controllers: [
    CreateAppointmentBillingController,
    GetAllAppointmentBillingsController,
    UpdateAppointmentBillingsController,
  ],
  providers: [
    SupabaseRequestProvider,
    CreateAppointmentBillingService,
    GetAllAppointmentBillingsService,
    UpdateAppointmentBillingsService,
  ],
})
export class AppointmentBillingsModule {}
