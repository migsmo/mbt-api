import { SupabaseClient } from '@supabase/supabase-js';
import { RetrieveAppointmentFilesRequest } from './dto/retrieve-appointment-files-request.dto';
import { RetrieveAppointmentFilesResponse } from './dto/retrieve-appointment-files-response.dto';
export declare class RetrieveAppointmentFilesService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    retrieveAppointmentFiles(request: RetrieveAppointmentFilesRequest): Promise<RetrieveAppointmentFilesResponse>;
}
