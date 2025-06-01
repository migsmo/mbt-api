import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { routes } from 'src/config/routes';
import { DownloadAppointmentFilesService } from './download-appointmnet-files.service';
import { DownloadAppointmentFilesRequest } from './dto/download-appointment-files-request.dto';

@Controller(routes.appointments.root)
export class DownloadAppointmentFilesController {
  constructor(
    private readonly downloadAppointmentFilesService: DownloadAppointmentFilesService,
  ) {}

  @Get(routes.appointments.downloadFiles)
  async downloadAppointmentFiles(
    @Query() query: DownloadAppointmentFilesRequest,
    @Res() res: Response,
  ) {
    const params: DownloadAppointmentFilesRequest = {
      appointmentId: query.appointmentId,
      fileType: query.fileType,
    };

    const { buffer, mimeType, fileName } =
      await this.downloadAppointmentFilesService.downloadAppointmentFiles(
        params,
      );

    res.set({
      'Content-Type': mimeType,
      'Content-Disposition': `attachment; filename="${fileName}"`,
    });
    res.send(buffer);
  }
}
