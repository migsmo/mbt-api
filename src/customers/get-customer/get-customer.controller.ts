import { Controller, Get, Param } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetCustomerService } from './get-customer.service';

@Controller(routes.customers.root)
export class GetCustomerController {
  constructor(private readonly getCustomerService: GetCustomerService) {}

  @Get(routes.customers.get)
  async getCustomerById(@Param('id') id: string) {
    return await this.getCustomerService.getCustomerById(id);
  }
}
