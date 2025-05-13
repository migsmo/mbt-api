import { Body, Controller, Put } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { UpdateEmployeeRequest } from './dto/update-employee-request.dto';
import { UpdateEmployeeResponse } from './dto/update-employee-response.dto';
import { UpdateEmployeeService } from './update-employee.service';

@Controller(routes.employees.root)
export class UpodateEmployeeController {
  constructor(private readonly updateEmployeeService: UpdateEmployeeService) {}

  @Put(routes.employees.update)
  async updateEmployee(
    @Body()
    request: UpdateEmployeeRequest,
  ): Promise<UpdateEmployeeResponse> {
    return await this.updateEmployeeService.updateEmployee(request);
  }
}
