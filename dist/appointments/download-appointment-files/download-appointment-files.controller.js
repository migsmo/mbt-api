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
exports.DownloadAppointmentFilesController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const download_appointmnet_files_service_1 = require("./download-appointmnet-files.service");
let DownloadAppointmentFilesController = class DownloadAppointmentFilesController {
    downloadAppointmentFilesService;
    constructor(downloadAppointmentFilesService) {
        this.downloadAppointmentFilesService = downloadAppointmentFilesService;
    }
    async downloadAppointmentFiles(query, res) {
        const params = {
            appointmentId: query.appointmentId,
            fileType: query.fileType,
        };
        const { buffer, mimeType, fileName } = await this.downloadAppointmentFilesService.downloadAppointmentFiles(params);
        res.set({
            'Content-Type': mimeType,
            'Content-Disposition': `attachment; filename="${fileName}"`,
        });
        res.send(buffer);
    }
};
exports.DownloadAppointmentFilesController = DownloadAppointmentFilesController;
__decorate([
    (0, common_1.Get)(routes_1.routes.appointments.downloadFiles),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DownloadAppointmentFilesController.prototype, "downloadAppointmentFiles", null);
exports.DownloadAppointmentFilesController = DownloadAppointmentFilesController = __decorate([
    (0, common_1.Controller)(routes_1.routes.appointments.root),
    __metadata("design:paramtypes", [download_appointmnet_files_service_1.DownloadAppointmentFilesService])
], DownloadAppointmentFilesController);
//# sourceMappingURL=download-appointment-files.controller.js.map