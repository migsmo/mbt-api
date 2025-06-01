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
exports.RetrieveAppointmentFilesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
let RetrieveAppointmentFilesService = class RetrieveAppointmentFilesService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async retrieveAppointmentFiles(request) {
        const { appointmentId, fileType } = request;
        const appointmentFile = await this.supabase
            .from('appointment_files')
            .select('appointment_id, file_type, file_url, file_name')
            .eq('appointment_id', appointmentId)
            .eq('file_type', fileType)
            .single();
        const appointmentFileData = appointmentFile.data;
        if (appointmentFile.error || !appointmentFileData) {
            throw new Error(`Failed to retrieve file URL for appointment ${appointmentId} and file type ${fileType}: ${appointmentFile.error?.message}`);
        }
        const response = {
            appointmentId: appointmentId,
            fileType: fileType,
            filePath: appointmentFileData.file_url,
            fileName: appointmentFileData.file_name,
        };
        return response;
    }
};
exports.RetrieveAppointmentFilesService = RetrieveAppointmentFilesService;
exports.RetrieveAppointmentFilesService = RetrieveAppointmentFilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], RetrieveAppointmentFilesService);
//# sourceMappingURL=retrieve-appointment-files.service.js.map