// src/services/create-service.controller.ts
import { Body, Controller, Put } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { UpdateCustomerRequest } from './dto/update-customer-request.dto';
import { UpdateCustomerService } from './update-customer.service';

@Controller(routes.customers.root)
export class UpdateCustomerController {
  constructor(private readonly updateCustomerService: UpdateCustomerService) {}

  @Put(routes.customers.update)
  async create(@Body() request: UpdateCustomerRequest) {
    return await this.updateCustomerService.updateCustomer(request);
  }
}
