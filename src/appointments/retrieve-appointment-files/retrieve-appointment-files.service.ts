import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { AppointmentFiles } from 'src/entity/appointment-files.entity';
import { RetrieveAppointmentFilesRequest } from './dto/retrieve-appointment-files-request.dto';
import { RetrieveAppointmentFilesResponse } from './dto/retrieve-appointment-files-response.dto';

@Injectable()
export class RetrieveAppointmentFilesService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async retrieveAppointmentFiles(
    request: RetrieveAppointmentFilesRequest,
  ): Promise<RetrieveAppointmentFilesResponse> {
    const { appointmentId, fileType } = request;

    const appointmentFile = await this.supabase
      .from('appointment_files')
      .select('appointment_id, file_type, file_url, file_name')
      .eq('appointment_id', appointmentId)
      .eq('file_type', fileType)
      .single();

    const appointmentFileData = appointmentFile.data as AppointmentFiles;

    if (appointmentFile.error || !appointmentFileData) {
      throw new Error(
        `Failed to retrieve file URL for appointment ${appointmentId} and file type ${fileType}: ${appointmentFile.error?.message}`,
      );
    }

    const response: RetrieveAppointmentFilesResponse = {
      appointmentId: appointmentId,
      fileType: fileType,
      filePath: appointmentFileData.file_url,
      fileName: appointmentFileData.file_name,
    };

    return response;
  }
}
