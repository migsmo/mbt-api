import { Controller, Get, Param } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetAllAppointmentBillingsService } from './get-all-appointment-billings.service';

@Controller(routes.appointmentBillings.root)
export class GetAllAppointmentBillingsController {
  constructor(
    private readonly getAllAppointmentBillingsService: GetAllAppointmentBillingsService,
  ) {}

  @Get(routes.appointmentBillings.getAll)
  async getAllAppointmentBillings(@Param('id') id: string) {
    return await this.getAllAppointmentBillingsService.getAllAppointmentBillings(
      id,
    );
  }
}
