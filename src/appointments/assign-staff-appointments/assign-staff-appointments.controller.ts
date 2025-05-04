import { Body, Controller, Put } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { AssignStaffAppointmentsService } from './assign-staff-appointments.service';
import { AssignStaffAppointmentsRequestDto } from './dto/assign-staff-appointments-request.dto';

@Controller(routes.appointments.root)
export class AssignStaffAppointmentsController {
  constructor(
    private readonly assignStaffAppointmentsService: AssignStaffAppointmentsService,
  ) {}

  @Put(routes.appointments.assignStaff)
  async assignStaffToAppointment(
    @Body() request: AssignStaffAppointmentsRequestDto,
  ) {
    return await this.assignStaffAppointmentsService.assignStaffToAppointments(
      request,
    );
  }
}
