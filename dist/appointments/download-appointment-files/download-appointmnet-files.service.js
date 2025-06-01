"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DownloadAppointmentFilesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let DownloadAppointmentFilesService = class DownloadAppointmentFilesService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async downloadAppointmentFiles(request) {
        const { appointmentId, fileType } = request;
        const appointmentFile = await this.supabase
            .from('appointment_files')
            .select('file_url')
            .eq('appointment_id', appointmentId)
            .eq('file_type', fileType)
            .single();
        const appointmentFileData = appointmentFile.data;
        if (appointmentFile.error || !appointmentFileData) {
            throw new base_error_1.BaseError(`Failed to download file URL for appointment ${appointmentId} and file type ${fileType}: ${appointmentFile.error?.message}`);
        }
        const pathParts = appointmentFileData.file_url.split('/').slice(1);
        const filePath = pathParts.join('/');
        console.log('appointmentFileData.file_url', filePath);
        const { data: fileData, error: downloadError } = await this.supabase.storage
            .from('appointment-files')
            .download(filePath);
        if (downloadError) {
            throw new base_error_1.BaseError(`Failed to download file: ${downloadError.message}`);
        }
        const arrayBuffer = await fileData.arrayBuffer();
        return {
            buffer: Buffer.from(arrayBuffer),
            mimeType: fileData.type,
            fileName: appointmentFileData.file_name,
        };
    }
};
exports.DownloadAppointmentFilesService = DownloadAppointmentFilesService;
exports.DownloadAppointmentFilesService = DownloadAppointmentFilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], DownloadAppointmentFilesService);
//# sourceMappingURL=download-appointmnet-files.service.js.map