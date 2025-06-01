import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { AppointmentFiles } from 'src/entity/appointment-files.entity';
import { BaseError } from 'src/errors/base-error';
import { DownloadAppointmentFilesRequest } from './dto/download-appointment-files-request.dto';

@Injectable()
export class DownloadAppointmentFilesService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async downloadAppointmentFiles(
    request: DownloadAppointmentFilesRequest,
  ): Promise<{
    buffer: Buffer;
    mimeType: string;
    fileName: string;
  }> {
    const { appointmentId, fileType } = request;

    const appointmentFile = await this.supabase
      .from('appointment_files')
      .select('file_url')
      .eq('appointment_id', appointmentId)
      .eq('file_type', fileType)
      .single();

    const appointmentFileData = appointmentFile.data as AppointmentFiles;

    if (appointmentFile.error || !appointmentFileData) {
      throw new BaseError(
        `Failed to download file URL for appointment ${appointmentId} and file type ${fileType}: ${appointmentFile.error?.message}`,
      );
    }

    const [bucket, ...pathParts] = appointmentFileData.file_url.split('/');
    const filePath = pathParts.join('/');

    console.log('appointmentFileData.file_url', filePath);

    const { data: fileData, error: downloadError } = await this.supabase.storage
      .from('appointment-files')
      .download(filePath);

    if (downloadError) {
      throw new BaseError(`Failed to download file: ${downloadError.message}`);
    }

    // Convert Blob to Buffer before returning
    const arrayBuffer = await fileData.arrayBuffer();
    return {
      buffer: Buffer.from(arrayBuffer),
      mimeType: fileData.type, // e.g., 'image/jpeg'
      fileName: appointmentFileData.file_name, // or extract from file_url
    };
  }
}
