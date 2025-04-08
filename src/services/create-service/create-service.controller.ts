// src/services/create-service.controller.ts
import { Body, Controller, Post } from '@nestjs/common';
import { CreateServiceService } from './create-service.service';
import { CreateServiceRequest } from './dto/create-service-request.dto';

@Controller('services')
export class CreateServiceController {
  constructor(private readonly createServiceService: CreateServiceService) {}

  @Post()
  async create(@Body() createServiceDto: CreateServiceRequest) {
    return await this.createServiceService.createService(createServiceDto);
  }
}
