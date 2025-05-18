import { Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { Service } from 'src/entity/service.entity';
import { BaseError } from 'src/errors/base-error';

@Injectable()
export class ServicesHelper {
  async getServiceById(supabase: SupabaseClient, serviceId: string) {
    const service = await supabase
      .from('services')
      .select('*')
      .eq('id', serviceId)
      .is('is_deleted', false)
      .single();

    if (service.error) throw new BaseError(service.error.message);

    const serviceData = service.data as Service;

    return serviceData;
  }

  async getServicesByIds(
    supabase: SupabaseClient,
    serviceIds: string[],
  ): Promise<Service[]> {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .in('id', serviceIds)
      .is('is_deleted', false);

    if (error) throw new BaseError(error.message);

    return data as Service[];
  }
}
