import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { AppointmentFiles } from 'src/entity/appointment-files.entity';
import { BaseError } from 'src/errors/base-error';
import { AppointmentsHelper } from 'src/helpers/appointments.helpers';
import { UploadAppointmentFilesRequest } from './dto/upload-appointment-files.request.dto';
import { UploadAppointmentFilesResponse } from './dto/upload-appointment-files.response.dto';

@Injectable()
export class UploadAppointmentFilesService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
    @Inject(AppointmentsHelper)
    private readonly appointmentsHelper: AppointmentsHelper,
  ) {}

  async uploadAppointmentFiles(
    file: Express.Multer.File,
    request: UploadAppointmentFilesRequest,
  ): Promise<UploadAppointmentFilesResponse> {
    const { appointmentId, fileType } = request;

    const appointmentData = await this.appointmentsHelper.getAppointmentById(
      this.supabase,
      appointmentId,
    );

    if (!appointmentData) {
      throw new BaseError(`Appointment with ID ${appointmentId} not found.`);
    }

    const fileName = `${appointmentId}_${fileType}`;

    // If same file already exists, it will overwrite it
    const { data: uploadFile, error: uploadError } = await this.supabase.storage
      .from('appointment-files')
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: true,
      });

    if (uploadError)
      throw new BaseError(
        'Failed to upload appointment files: ' + uploadError.message,
      );

    const appointmentFiles = await this.supabase
      .from('appointment_files')
      .upsert(
        {
          appointment_id: appointmentId,
          file_type: fileType,
          file_url: uploadFile.fullPath,
          file_name: fileName,
        },
        { onConflict: 'file_url' },
      )
      .select()
      .single();

    const appointmentFilesData = appointmentFiles.data as AppointmentFiles;

    if (appointmentFiles.error) {
      throw new BaseError(
        'Failed to save appointment files data: ' +
          appointmentFiles.error.message,
      );
    }

    const response: UploadAppointmentFilesResponse = {
      appointmentId: appointmentFilesData.appointment_id,
      fileType: appointmentFilesData.file_type,
      filePath: appointmentFilesData.file_url,
      fileName: appointmentFilesData.file_name,
    };

    return response;
  }
}
