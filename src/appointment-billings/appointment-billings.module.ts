import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { CreateAppointmentBillingService } from './create-appointment-billing/create-appointment-billing.service';
import { CreateAppointmentBillingController } from './create-appointment-billing/create-appointment-billings.controller';
import { GetAllAppointmentBillingsController } from './get-all-appointment-billings/get-all-appointment-billings.controller';
import { GetAllAppointmentBillingsService } from './get-all-appointment-billings/get-all-appointment-billings.service';

@Module({
  controllers: [
    CreateAppointmentBillingController,
    GetAllAppointmentBillingsController,
  ],
  providers: [
    SupabaseRequestProvider,
    CreateAppointmentBillingService,
    GetAllAppointmentBillingsService,
  ],
})
export class AppointmentBillingsModule {}
