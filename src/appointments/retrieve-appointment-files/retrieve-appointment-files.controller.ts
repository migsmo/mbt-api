import { Controller, Get, Query } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { RetrieveAppointmentFilesRequest } from './dto/retrieve-appointment-files-request.dto';
import { RetrieveAppointmentFilesResponse } from './dto/retrieve-appointment-files-response.dto';
import { RetrieveAppointmentFilesService } from './retrieve-appointment-files.service';

@Controller(routes.appointments.root)
export class RetrieveAppointmentFilesController {
  constructor(
    private readonly retrieveAppointmentFilesService: RetrieveAppointmentFilesService,
  ) {}

  @Get(routes.appointments.retrieveFiles)
  async retrieveAppointmentFiles(
    @Query() query: RetrieveAppointmentFilesRequest,
  ): Promise<RetrieveAppointmentFilesResponse> {
    const params: RetrieveAppointmentFilesRequest = {
      appointmentId: query.appointmentId,
      fileType: query.fileType,
    };

    return this.retrieveAppointmentFilesService.retrieveAppointmentFiles(
      params,
    );
  }
}
