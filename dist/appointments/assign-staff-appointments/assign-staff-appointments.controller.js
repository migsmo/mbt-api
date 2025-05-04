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
exports.AssignStaffAppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const assign_staff_appointments_service_1 = require("./assign-staff-appointments.service");
const assign_staff_appointments_request_dto_1 = require("./dto/assign-staff-appointments-request.dto");
let AssignStaffAppointmentsController = class AssignStaffAppointmentsController {
    assignStaffAppointmentsService;
    constructor(assignStaffAppointmentsService) {
        this.assignStaffAppointmentsService = assignStaffAppointmentsService;
    }
    async assignStaffToAppointment(request) {
        return await this.assignStaffAppointmentsService.assignStaffToAppointments(request);
    }
};
exports.AssignStaffAppointmentsController = AssignStaffAppointmentsController;
__decorate([
    (0, common_1.Put)(routes_1.routes.appointments.assignStaff),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [assign_staff_appointments_request_dto_1.AssignStaffAppointmentsRequestDto]),
    __metadata("design:returntype", Promise)
], AssignStaffAppointmentsController.prototype, "assignStaffToAppointment", null);
exports.AssignStaffAppointmentsController = AssignStaffAppointmentsController = __decorate([
    (0, common_1.Controller)(routes_1.routes.appointments.root),
    __metadata("design:paramtypes", [assign_staff_appointments_service_1.AssignStaffAppointmentsService])
], AssignStaffAppointmentsController);
//# sourceMappingURL=assign-staff-appointments.controller.js.map