import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { routes } from 'src/config/routes';
import { UploadAppointmentFilesRequest } from './dto/upload-appointment-files.request.dto';
import { UploadAppointmentFilesService } from './upload-appointment-files.service';

@Controller(routes.appointments.root)
export class UploadAppointmentFilesController {
  constructor(
    private readonly uploadAppointmentFilesService: UploadAppointmentFilesService,
  ) {}

  @Post(routes.appointments.uploadFiles)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAppointmentFiles(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: UploadAppointmentFilesRequest,
  ) {
    return this.uploadAppointmentFilesService.uploadAppointmentFiles(
      file,
      body,
    );
  }
}
