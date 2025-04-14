import { Controller, Get, Param } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetServiceService } from './get-service.service';

@Controller(routes.service.root)
export class GetServiceController {
  constructor(private readonly getServiceService: GetServiceService) {}

  @Get(routes.service.getService)
  async getServiceById(@Param('id') id: string) {
    return await this.getServiceService.getServiceById(id);
  }
}


auth setAuth({
    access token 
})