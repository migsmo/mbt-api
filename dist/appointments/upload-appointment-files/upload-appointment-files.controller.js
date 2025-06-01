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
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadAppointmentFilesController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const routes_1 = require("../../config/routes");
const upload_appointment_files_request_dto_1 = require("./dto/upload-appointment-files.request.dto");
const upload_appointment_files_service_1 = require("./upload-appointment-files.service");
let UploadAppointmentFilesController = class UploadAppointmentFilesController {
    uploadAppointmentFilesService;
    constructor(uploadAppointmentFilesService) {
        this.uploadAppointmentFilesService = uploadAppointmentFilesService;
    }
    async uploadAppointmentFiles(file, body) {
        return this.uploadAppointmentFilesService.uploadAppointmentFiles(file, body);
    }
};
exports.UploadAppointmentFilesController = UploadAppointmentFilesController;
__decorate([
    (0, common_1.Post)(routes_1.routes.appointments.uploadFiles),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof Express !== "undefined" && (_a = Express.Multer) !== void 0 && _a.File) === "function" ? _b : Object, upload_appointment_files_request_dto_1.UploadAppointmentFilesRequest]),
    __metadata("design:returntype", Promise)
], UploadAppointmentFilesController.prototype, "uploadAppointmentFiles", null);
exports.UploadAppointmentFilesController = UploadAppointmentFilesController = __decorate([
    (0, common_1.Controller)(routes_1.routes.appointments.root),
    __metadata("design:paramtypes", [upload_appointment_files_service_1.UploadAppointmentFilesService])
], UploadAppointmentFilesController);
//# sourceMappingURL=upload-appointment-files.controller.js.map