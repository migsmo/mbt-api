import { Controller, Get, Param } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetEmployeeService } from './get-employee.service';

@Controller(routes.employees.root)
export class GetEmployeeController {
  constructor(private readonly getEmployeeService: GetEmployeeService) {}

  @Get(routes.employees.get)
  async getEmployee(@Param('id') id: string) {
    return await this.getEmployeeService.getEmployee(id);
  }
}
