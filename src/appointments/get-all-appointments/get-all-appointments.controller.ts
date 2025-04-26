import { Body, Controller, Post } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetAllAppointmentsResponse } from './dto/get-all-appointments-response.dto';
import { GetAllAppointmentsRequest } from './dto/get-all-appointments.request.dto';
import { GetAllAppointmentsService } from './get-all-appointments.service';

@Controller(routes.appointments.root)
export class GetAllAppointmentsController {
  constructor(
    private readonly getAllAppointmentsService: GetAllAppointmentsService,
  ) {}

  @Post(routes.appointments.getAll)
  async getAvailableSlotsByDay(
    @Body() request: GetAllAppointmentsRequest,
  ): Promise<GetAllAppointmentsResponse> {
    return await this.getAllAppointmentsService.getAllAppointments(request);
  }
}
