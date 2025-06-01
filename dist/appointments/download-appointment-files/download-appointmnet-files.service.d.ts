import { SupabaseClient } from '@supabase/supabase-js';
import { DownloadAppointmentFilesRequest } from './dto/download-appointment-files-request.dto';
export declare class DownloadAppointmentFilesService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    downloadAppointmentFiles(request: DownloadAppointmentFilesRequest): Promise<{
        buffer: Buffer;
        mimeType: string;
        fileName: string;
    }>;
}
