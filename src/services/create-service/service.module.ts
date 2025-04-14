// src/services/create-service.module.ts
import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { SupabaseProvider } from 'src/auth/providers/supabase.provider';
import { GetServiceController } from '../get-service/get-service.controller';
import { GetServiceService } from '../get-service/get-service.service';
import { GetServicesController } from '../get-services/get-services.controller';
import { GetServicesService } from '../get-services/get-services.service';
import { CreateServiceController } from './create-service.controller';
import { CreateServiceService } from './create-service.service';

@Module({
  controllers: [
    CreateServiceController,
    GetServiceController,
    GetServicesController,
  ],
  providers: [
    CreateServiceService,
    GetServiceService,
    GetServicesService,
    SupabaseProvider,
    SupabaseRequestProvider,
  ],
})
export class CreateServiceModule {}
