import { UploadAppointmentFilesRequest } from './dto/upload-appointment-files.request.dto';
import { UploadAppointmentFilesService } from './upload-appointment-files.service';
export declare class UploadAppointmentFilesController {
    private readonly uploadAppointmentFilesService;
    constructor(uploadAppointmentFilesService: UploadAppointmentFilesService);
    uploadAppointmentFiles(file: Express.Multer.File, body: UploadAppointmentFilesRequest): Promise<import("./dto/upload-appointment-files.response.dto").UploadAppointmentFilesResponse>;
}
