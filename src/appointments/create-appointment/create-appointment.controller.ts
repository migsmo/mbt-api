import { Body, Controller, Post } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { CreateAppointmentService } from './create-appointment.service';
import { CreateAppointmentRequest } from './dto/create-appointment-request.dto';
import { CreateAppointmentResponse } from './dto/create-appointment-response.dto';

@Controller(routes.appointments.root)
export class CreateAppointmentController {
  constructor(
    private readonly createAppointmentService: CreateAppointmentService,
  ) {}

  @Post(routes.appointments.create)
  async createAppointment(
    @Body() request: CreateAppointmentRequest,
  ): Promise<CreateAppointmentResponse> {
    return await this.createAppointmentService.createAppointment(request);
  }
}
