import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseError } from 'src/errors/base-error';
import { Service } from '../../entity/service.entity';
import { GetServiceResponse } from '../get-service/dto/get-service-response.dto';
import { UpdateServiceRequest } from './dto/update-service-request.dto';

@Injectable()
export class UpdateServiceService {
  constructor(
    @Inject('SUPABASE_REQUEST_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async updateService(request: UpdateServiceRequest) {
    const updateRequest = {
      name: request.name,
      price: request.price,
      commission_rate: request.commissionRate,
      description: request.description,
      duration_in_minutes: request.durationInMinutes,
    };

    console.log(request);
    const service = await this.supabase
      .from('services')
      .update(updateRequest)
      .eq('id', request.id)
      .select()
      .single();

    const serviceData = service.data as Service;

    if (service.error) {
      throw new BaseError(`Failed to update service: ${service.error.message}`);
    }

    const response: GetServiceResponse = {
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
