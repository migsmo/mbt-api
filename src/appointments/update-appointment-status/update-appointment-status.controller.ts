import { Body, Controller, Post } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { UpdateAppointmentStatusRequest } from './dto/update-appointment-status-request.dto';
import { UpdateAppointmentStatusService } from './update-appointment-status.service';

@Controller(routes.appointments.root)
export class UpdateAppointmentStatusController {
  constructor(
    private readonly updateAppointmentStatusService: UpdateAppointmentStatusService,
  ) {}

  @Post(routes.appointments.updateStatus)
  async updateAppointmentStatus(@Body() body: UpdateAppointmentStatusRequest) {
    return await this.updateAppointmentStatusService.updateAppointmentStatus(
      body,
    );
  }
}
