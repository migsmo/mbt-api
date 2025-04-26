import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { BaseError } from 'src/errors/base-error';
import { Service } from '../../entity/service.entity';
import { GetServiceResponse } from '../get-service/dto/get-service-response.dto';

@Injectable()
export class GetServiceService {
  constructor(
    @Inject('SUPABASE_REQUEST_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}

  async getServiceById(id: string) {
    const service = await this.supabase
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    const serviceData = service.data as Service;

    if (service.error) {
      throw new BaseError(`Failed to get service: ${service.error.message}`);
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
