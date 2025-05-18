import { Controller, Get, Param, Query } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetEmployeeAppointmentsRequest } from './dto/get-employee-appointments.request.dto';
import { GetEmployeeAppointmentsResponse } from './dto/get-employee-appointments.response.dto';
import { GetEmployeeAppointmentsService } from './get-employee-appointments.service';

@Controller(routes.employees.root)
export class GetEmployeeAppointmentsController {
  constructor(
    private readonly getEmployeeAppointmentsService: GetEmployeeAppointmentsService,
  ) {}

  @Get(routes.employees.getAllAppointments)
  async getAllEmployeeAppointments(
    @Param('employeeId') employeeId: string,
    @Query() query: GetEmployeeAppointmentsRequest,
  ): Promise<GetEmployeeAppointmentsResponse> {
    const params: GetEmployeeAppointmentsRequest = {
      page: query.page ? parseInt(query.page as unknown as string, 10) : 1,
      limit: query.limit ? parseInt(query.limit as unknown as string, 10) : 10,
      sortBy: query.sortBy || 'created_at',
      sortDirection: query.sortDirection || 'desc',
    };

    return await this.getEmployeeAppointmentsService.getAllEmployeeAppointments(
      employeeId,
      params,
    );
  }
}
