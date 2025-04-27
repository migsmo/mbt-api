import { Body, Controller, Post } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { CreateAppointmentBillingService } from './create-appointment-billing.service';
import { CreateAppointmentBillingRequest } from './dto/create-appointment-billing-request.dto';

@Controller(routes.appointmentBillings.root)
export class CreateAppointmentBillingController {
  constructor(
    private readonly createAppointmentBillingService: CreateAppointmentBillingService,
  ) {}

  @Post(routes.appointmentBillings.create)
  async createAppointmentBilling(
    @Body() request: CreateAppointmentBillingRequest,
  ) {
    return await this.createAppointmentBillingService.createAppointmentBilling(
      request,
    );
  }
}
