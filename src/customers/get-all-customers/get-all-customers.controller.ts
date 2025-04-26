import { Controller, Get, Query } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetAllCustomersRequest } from './dto/get-all-customers-request.dto';
import { GetAllCustomersResponse } from './dto/get-all-customers-response.dto';
import { GetAllCustomersService } from './get-all-customers.service';

@Controller(routes.customers.root)
export class GetAllCustomersController {
  constructor(
    private readonly getAllCustomersService: GetAllCustomersService,
  ) {}

  @Get(routes.customers.getAll)
  async getAllCustomers(
    @Query() query: GetAllCustomersRequest,
  ): Promise<GetAllCustomersResponse> {
    const params: GetAllCustomersRequest = {
      page: query.page ? parseInt(query.page as unknown as string, 10) : 1,
      limit: query.limit ? parseInt(query.limit as unknown as string, 10) : 10,
      sortBy: query.sortBy || 'created_at',
      sortDirection: query.sortDirection || 'desc',
    };

    return this.getAllCustomersService.getAllCustomersService(params);
  }
}
