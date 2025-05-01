import { Controller, Get, Query } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetAllEmployeesRequest } from './dto/get-all-employees-request.dto';
import { GetAllEmployeesService } from './get-all-employees.service';

@Controller(routes.employees.root)
export class GetAllEmployeesController {
  constructor(
    private readonly getAllEmployeesService: GetAllEmployeesService,
  ) {}

  @Get(routes.employees.getAll)
  async getAllEmployees(@Query() query: GetAllEmployeesRequest) {
    const params: GetAllEmployeesRequest = {
      page: query.page ? parseInt(query.page as unknown as string, 10) : 1,
      limit: query.limit ? parseInt(query.limit as unknown as string, 10) : 10,
      sortBy: query.sortBy || 'created_at',
      sortDirection: query.sortDirection || 'desc',
      search: query.search || undefined,
    };

    return await this.getAllEmployeesService.getAllEmployees(params);
  }
}
