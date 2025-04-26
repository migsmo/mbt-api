import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
import { Customers } from 'src/entity/customers.entity';
import { BaseError } from 'src/errors/base-error';
import { GetCustomerResponse } from '../get-customer/dto/get-customer-response.dto';
import { GetAllCustomersRequest } from './dto/get-all-customers-request.dto';
import { GetAllCustomersResponse } from './dto/get-all-customers-response.dto';

@Injectable()
export class GetAllCustomersService {
  constructor(
    @Inject('SUPABASE_REQUEST_CLIENT')
    private readonly supabase: SupabaseClient,
  ) {}
  // New method for paginated service retrieval
  async getAllCustomersService(
    params: GetAllCustomersRequest,
  ): Promise<GetAllCustomersResponse> {
    const { page, limit, sortBy, sortDirection } = params;

    // Calculate pagination parameters
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    // Get total count first (for pagination metadata)
    const { count, error: countError } = await this.supabase
      .from('customers')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      throw new BaseError(`Failed to count customers: ${countError.message}`);
    }

    // Get paginated data
    const { data, error } = await this.supabase
      .from('customers')
      .select('*')
      .order(sortBy, { ascending: sortDirection === 'asc' })
      .range(from, to);

    if (error) {
      throw new BaseError(`Failed to get customers: ${error.message}`);
    }

    // Map the service data to the response format
    const customers = (data as Customers[]).map((customerData) =>
      this.mapCustomerData(customerData),
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
      customers,
      meta,
    };
  }
  private mapCustomerData(customerData: Customers): GetCustomerResponse {
    return {
      id: customerData.id,
      createdAt: new Date(customerData.created_at),
      firstName: customerData.first_name,
      lastName: customerData.last_name,
      email: customerData.email,
      address: customerData.address,
      contactNumber: customerData.contact_number,
      occupation: customerData.occupation,
      additionalRemarks: customerData.additional_remarks,
    };
  }
}
