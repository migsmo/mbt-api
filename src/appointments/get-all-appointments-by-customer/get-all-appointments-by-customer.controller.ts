import { Controller, Get, Param, Query } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetAllAppointmentsByCustomerRequest } from './dto/get-all-appointments-by-customer.request.dto';
import { GetAllAppointmentsByCustomerResponse } from './dto/get-all-appointments-by-customer.response.dto';
import { GetAllAppointmentsByCustomerService } from './get-all-appointments-by-customer.service';

@Controller(routes.appointments.root)
export class GetAllAppointmentsByCustomerController {
  constructor(
    private readonly getAllAppointmentsByCustomerService: GetAllAppointmentsByCustomerService,
  ) {}

  @Get(routes.appointments.getAllByCustomer)
  async getAllAppointmentsByCustomer(
    @Param('customerId') id: string,
    @Query() query: GetAllAppointmentsByCustomerRequest,
  ): Promise<GetAllAppointmentsByCustomerResponse> {
    const params: GetAllAppointmentsByCustomerRequest = {
      page: query.page ? parseInt(query.page as unknown as string, 10) : 1,
      limit: query.limit ? parseInt(query.limit as unknown as string, 10) : 10,
      sortBy: query.sortBy || 'created_at',
      sortDirection: query.sortDirection || 'desc',
    };
    return await this.getAllAppointmentsByCustomerService.getAllAppointmentsByCustomer(
      id,
      params,
    );
  }
}
