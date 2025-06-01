import { SupabaseClient } from '@supabase/supabase-js';
import { AppointmentsHelper } from 'src/helpers/appointments.helpers';
import { UploadAppointmentFilesRequest } from './dto/upload-appointment-files.request.dto';
import { UploadAppointmentFilesResponse } from './dto/upload-appointment-files.response.dto';
export declare class UploadAppointmentFilesService {
    private readonly supabase;
    private readonly appointmentsHelper;
    constructor(supabase: SupabaseClient, appointmentsHelper: AppointmentsHelper);
    uploadAppointmentFiles(file: Express.Multer.File, request: UploadAppointmentFilesRequest): Promise<UploadAppointmentFilesResponse>;
}
