import { Response } from 'express';
import { DownloadAppointmentFilesService } from './download-appointmnet-files.service';
import { DownloadAppointmentFilesRequest } from './dto/download-appointment-files-request.dto';
export declare class DownloadAppointmentFilesController {
    private readonly downloadAppointmentFilesService;
    constructor(downloadAppointmentFilesService: DownloadAppointmentFilesService);
    downloadAppointmentFiles(query: DownloadAppointmentFilesRequest, res: Response): Promise<void>;
}
