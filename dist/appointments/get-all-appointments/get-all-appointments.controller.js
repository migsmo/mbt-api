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
exports.GetAllAppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const get_all_appointments_request_dto_1 = require("./dto/get-all-appointments.request.dto");
const get_all_appointments_service_1 = require("./get-all-appointments.service");
let GetAllAppointmentsController = class GetAllAppointmentsController {
    getAllAppointmentsService;
    constructor(getAllAppointmentsService) {
        this.getAllAppointmentsService = getAllAppointmentsService;
    }
    async getAvailableSlotsByDay(request) {
        return await this.getAllAppointmentsService.getAllAppointments(request);
    }
};
exports.GetAllAppointmentsController = GetAllAppointmentsController;
__decorate([
    (0, common_1.Post)(routes_1.routes.appointments.getAll),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_all_appointments_request_dto_1.GetAllAppointmentsRequest]),
    __metadata("design:returntype", Promise)
], GetAllAppointmentsController.prototype, "getAvailableSlotsByDay", null);
exports.GetAllAppointmentsController = GetAllAppointmentsController = __decorate([
    (0, common_1.Controller)(routes_1.routes.appointments.root),
    __metadata("design:paramtypes", [get_all_appointments_service_1.GetAllAppointmentsService])
], GetAllAppointmentsController);
//# sourceMappingURL=get-all-appointments.controller.js.map