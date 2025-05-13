import { Controller, Delete, Param } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { DeleteEmployeeService } from './delete-employee.service';

@Controller(routes.employees.root)
export class DeleteEmployeeController {
  constructor(private readonly deleteEmployeeService: DeleteEmployeeService) {}

  @Delete(routes.employees.delete)
  async deleteEmployee(@Param('id') id: string) {
    return await this.deleteEmployeeService.deleteEmployee(id);
  }
}
