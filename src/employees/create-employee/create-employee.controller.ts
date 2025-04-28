import { Body, Controller, Post } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { CreateEmployeeService } from './create-employee.service';
import { CreateEmployeeRequest } from './dto/create-employee-request.dto';

@Controller(routes.employees.root)
export class CreateEmployeeController {
  constructor(private readonly createEmployeeService: CreateEmployeeService) {}

  @Post(routes.employees.create)
  async createEmployee(@Body() request: CreateEmployeeRequest) {
    return await this.createEmployeeService.createEmployee(request);
  }
}
