import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { BaseError } from 'src/errors/base-error';
import { Service } from '../../entity/service.entity';
import { CreateServiceRequest } from './dto/create-service-request.dto';
import { CreateServiceResponse } from './dto/create-service-response.dto';

@Injectable()
export class CreateServiceService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async createService(data: CreateServiceRequest) {
    const service = await this.supabase
      .from('services')
      .insert({
        name: data.name,
        price: data.price,
        commission_rate: data.commissionRate,
        description: data.description,
        duration_in_minutes: data.durationInMinutes,
        // id and created_at are generated by Supabase/Postgres
      })
      .select()
      .single();

    const serviceData = service.data as Service;

    if (service.error) {
      throw new BaseError(`Failed to create service: ${service.error.message}`);
    }

    const response: CreateServiceResponse = {
      id: serviceData.id,
      createdAt: new Date(serviceData.created_at),
      name: serviceData.name,
      price: serviceData.price,
      commissionRate: serviceData.commission_rate,
      description: serviceData.description,
      durationInMinutes: serviceData.duration_in_minutes,
    };

    return response;
  }
}
