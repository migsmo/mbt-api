// src/services/create-service.module.ts
import { Module } from '@nestjs/common';
import { SupabaseProvider } from 'src/auth/providers/supabase.provider';
import { CreateServiceController } from './create-service.controller';
import { CreateServiceService } from './create-service.service';

@Module({
  controllers: [CreateServiceController],
  providers: [CreateServiceService, SupabaseProvider],
})
export class CreateServiceModule {}
