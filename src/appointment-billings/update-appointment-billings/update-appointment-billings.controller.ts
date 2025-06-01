import { Body, Controller, Put } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { UpdateAppointmentBillingsRequest } from './dto/update-appointment-billings-request.dto';
import { UpdateAppointmentBillingsResponse } from './dto/update-appointment-billings-response.dto';
import { UpdateAppointmentBillingsService } from './update-appointment-billings.service';

@Controller(routes.appointmentBillings.root)
export class UpdateAppointmentBillingsController {
  constructor(
    private readonly updateAppointmentBillingsService: UpdateAppointmentBillingsService,
  ) {}

  @Put(routes.appointmentBillings.update)
  async updateAppointmentBillings(
    @Body()
    request: UpdateAppointmentBillingsRequest,
  ): Promise<UpdateAppointmentBillingsResponse> {
    return await this.updateAppointmentBillingsService.updateAppointmentBillings(
      request,
    );
  }
}
