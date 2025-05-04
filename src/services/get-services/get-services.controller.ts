import { Controller, Get, Query } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetServicesRequest } from './dto/get-services-request.dto';
import { GetServicesResponse } from './dto/get-services-response.dto';
import { GetServicesService } from './get-services.service';

@Controller(routes.service.root)
export class GetServicesController {
  constructor(private readonly getServicesService: GetServicesService) {}

  @Get(routes.service.getAll)
  async getServices(
    @Query() query: GetServicesRequest,
  ): Promise<GetServicesResponse> {
    const params: GetServicesRequest = {
      page: query.page ? parseInt(query.page as unknown as string, 10) : 1,
      limit: query.limit ? parseInt(query.limit as unknown as string, 10) : 10,
      sortBy: query.sortBy || 'created_at',
      sortDirection: query.sortDirection || 'desc',
    };

    return this.getServicesService.getServices(params);
  }
}
