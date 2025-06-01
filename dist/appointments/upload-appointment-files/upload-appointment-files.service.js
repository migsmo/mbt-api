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
exports.UploadAppointmentFilesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
const appointments_helpers_1 = require("../../helpers/appointments.helpers");
let UploadAppointmentFilesService = class UploadAppointmentFilesService {
    supabase;
    appointmentsHelper;
    constructor(supabase, appointmentsHelper) {
        this.supabase = supabase;
        this.appointmentsHelper = appointmentsHelper;
    }
    async uploadAppointmentFiles(file, request) {
        const { appointmentId, fileType } = request;
        const appointmentData = await this.appointmentsHelper.getAppointmentById(this.supabase, appointmentId);
        if (!appointmentData) {
            throw new base_error_1.BaseError(`Appointment with ID ${appointmentId} not found.`);
        }
        const fileName = `${appointmentId}_${fileType}`;
        const { data: uploadFile, error: uploadError } = await this.supabase.storage
            .from('appointment-files')
            .upload(fileName, file.buffer, {
            contentType: file.mimetype,
            upsert: true,
        });
        if (uploadError)
            throw new base_error_1.BaseError('Failed to upload appointment files: ' + uploadError.message);
        const appointmentFiles = await this.supabase
            .from('appointment_files')
            .upsert({
            appointment_id: appointmentId,
            file_type: fileType,
            file_url: uploadFile.fullPath,
            file_name: fileName,
        }, { onConflict: 'file_url' })
            .select()
            .single();
        const appointmentFilesData = appointmentFiles.data;
        if (appointmentFiles.error) {
            throw new base_error_1.BaseError('Failed to save appointment files data: ' +
                appointmentFiles.error.message);
        }
        const response = {
            appointmentId: appointmentFilesData.appointment_id,
            fileType: appointmentFilesData.file_type,
            filePath: appointmentFilesData.file_url,
            fileName: appointmentFilesData.file_name,
        };
        return response;
    }
};
exports.UploadAppointmentFilesService = UploadAppointmentFilesService;
exports.UploadAppointmentFilesService = UploadAppointmentFilesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __param(1, (0, common_1.Inject)(appointments_helpers_1.AppointmentsHelper)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient,
        appointments_helpers_1.AppointmentsHelper])
], UploadAppointmentFilesService);
//# sourceMappingURL=upload-appointment-files.service.js.map