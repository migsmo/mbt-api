// src/services/create-service.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { CreateCustomerService } from './create-customer.service';
import { CreateCustomerRequest } from './dto/create-customer-request.dto';

@Controller(routes.customers.root)
export class CreateCustomerController {
  constructor(private readonly createCustomerService: CreateCustomerService) {}

  @Post(routes.customers.create)
  async create(@Body() request: CreateCustomerRequest) {
    return await this.createCustomerService.createCustomer(request);
  }
}
