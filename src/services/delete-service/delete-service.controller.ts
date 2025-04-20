import { Controller, Delete, Param } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { DeleteServiceService } from './delete-service.service';

@Controller(routes.service.root)
export class DeleteServiceController {
  constructor(private readonly deleteServiceService: DeleteServiceService) {}

  @Delete(routes.service.delete)
  async deleteService(@Param('id') id: string) {
    return await this.deleteServiceService.deleteService(id);
  }
}
