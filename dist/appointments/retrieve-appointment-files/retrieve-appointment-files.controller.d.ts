import { RetrieveAppointmentFilesRequest } from './dto/retrieve-appointment-files-request.dto';
import { RetrieveAppointmentFilesResponse } from './dto/retrieve-appointment-files-response.dto';
import { RetrieveAppointmentFilesService } from './retrieve-appointment-files.service';
export declare class RetrieveAppointmentFilesController {
    private readonly retrieveAppointmentFilesService;
    constructor(retrieveAppointmentFilesService: RetrieveAppointmentFilesService);
    retrieveAppointmentFiles(query: RetrieveAppointmentFilesRequest): Promise<RetrieveAppointmentFilesResponse>;
}
