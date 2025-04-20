// src/services/create-service.module.ts
import { Module } from '@nestjs/common';
import { SupabaseRequestProvider } from 'src/auth/providers/supabase-request.provider';
import { SupabaseProvider } from 'src/auth/providers/supabase.provider';
import { CreateServiceController } from './create-service/create-service.controller';
import { CreateServiceService } from './create-service/create-service.service';
import { DeleteServiceController } from './delete-service/delete-service.controller';
import { DeleteServiceService } from './delete-service/delete-service.service';
import { GetServiceController } from './get-service/get-service.controller';
import { GetServiceService } from './get-service/get-service.service';
import { GetServicesController } from './get-services/get-services.controller';
import { GetServicesService } from './get-services/get-services.service';
import { UpdateServiceController } from './update-service/update-service.controller';
import { UpdateServiceService } from './update-service/update-service.service';

@Module({
  controllers: [
    CreateServiceController,
    GetServiceController,
    GetServicesController,
    DeleteServiceController,
    UpdateServiceController,
  ],
  providers: [
    CreateServiceService,
    GetServiceService,
    GetServicesService,
    SupabaseProvider,
    SupabaseRequestProvider,
    DeleteServiceService,
    UpdateServiceService,
  ],
})
export class CreateServiceModule {}
