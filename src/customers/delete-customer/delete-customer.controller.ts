import { Controller, Delete, Param } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { DeleteCustomerService } from './delete-customer.service';

@Controller(routes.customers.root)
export class DeletecustomersController {
  constructor(private readonly deleteCustomerService: DeleteCustomerService) {}

  @Delete(routes.customers.delete)
  async deleteCustomers(@Param('id') id: string) {
    return await this.deleteCustomerService.deleteCustomer(id);
  }
}
