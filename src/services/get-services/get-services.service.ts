import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
import { BaseError } from 'src/errors/base-error';
import { Service } from '../../entity/service.entity';
import { GetServiceResponse } from '../get-service/dto/get-service-response.dto';
import { GetServicesRequest } from './dto/get-services-request.dto';
import { GetServicesResponse } from './dto/get-services-response.dto';

@Injectable()
export class GetServicesService {
  constructor(
    @Inject('SUPABASE_REQUEST_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}
  // New method for paginated service retrieval
  async getServices(params: GetServicesRequest): Promise<GetServicesResponse> {
    const { page, limit, sortBy, sortDirection } = params;

    const { count, error: countError } = await this.supabase
      .from('services')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw new BaseError(`Failed to count services: ${countError.message}`);
    }

    const query = this.supabase.from('services').select('*');

    let queryResult;

    if (limit > 0) {
      const from = (page - 1) * limit;
      const to = from + limit - 1;

      queryResult = await query
        .order(sortBy, { ascending: sortDirection === 'asc' })
        .range(from, to);
    } else {
      queryResult = await query.order(sortBy, {
        ascending: sortDirection === 'asc',
      });
    }

    const { data, error } = queryResult;

    if (error) {
      throw new BaseError(`Failed to get services: ${error.message}`);
    }

    // Map the service data to the response format
    const services = (data as Service[]).map((serviceData) =>
      this.mapServiceData(serviceData),
    );

    // Calculate pagination metadata
    const totalItems = count || 0;
    const totalPages = Math.ceil(totalItems / limit);

    const meta: PaginationMeta = {
      currentPage: page,
      itemsPerPage: limit,
      totalItems,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    return {
      services,
      meta,
    };
  }
  private mapServiceData(serviceData: Service): GetServiceResponse {
    return {
      id: serviceData.id,
      createdAt: new Date(serviceData.created_at),
      name: serviceData.name,
      price: serviceData.price,
      commissionRate: serviceData.commission_rate,
      description: serviceData.description,
      durationInMinutes: serviceData.duration_in_minutes,
    };
  }
}
