import { Controller, Get, Param } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetAppointmentService } from './get-appointment.service';

@Controller(routes.appointments.root)
export class GetAppointmentController {
  constructor(private readonly getAppointmentService: GetAppointmentService) {}

  @Get(routes.appointments.get)
  async getAppointmentById(@Param('id') id: string) {
    return await this.getAppointmentService.getAppointmentById(id);
  }
}
