// src/services/create-service.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { CreateServiceService } from './create-service.service';
import { CreateServiceRequest } from './dto/create-service-request.dto';

@Controller(routes.service.root)
export class CreateServiceController {
  constructor(private readonly createServiceService: CreateServiceService) {}

  @Post(routes.service.createService)
  async create(@Body() createServiceDto: CreateServiceRequest) {
    return await this.createServiceService.createService(createServiceDto);
  }
}
