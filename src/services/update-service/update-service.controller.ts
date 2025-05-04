import { Body, Controller, Put } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { UpdateServiceRequest } from './dto/update-service-request.dto';
import { UpdateServiceResponse } from './dto/update-service-response.dto';
import { UpdateServiceService } from './update-service.service';

@Controller(routes.service.root)
export class UpdateServiceController {
  constructor(private readonly updateServiceService: UpdateServiceService) {}

  @Put(routes.service.update)
  async updateService(
    @Body() request: UpdateServiceRequest,
  ): Promise<UpdateServiceResponse> {
    return this.updateServiceService.updateService(request);
  }
}
