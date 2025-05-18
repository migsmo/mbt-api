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
exports.GetEmployeeAppointmentsController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const get_employee_appointments_request_dto_1 = require("./dto/get-employee-appointments.request.dto");
const get_employee_appointments_service_1 = require("./get-employee-appointments.service");
let GetEmployeeAppointmentsController = class GetEmployeeAppointmentsController {
    getEmployeeAppointmentsService;
    constructor(getEmployeeAppointmentsService) {
        this.getEmployeeAppointmentsService = getEmployeeAppointmentsService;
    }
    async getAllEmployeeAppointments(employeeId, query) {
        const params = {
            page: query.page ? parseInt(query.page, 10) : 1,
            limit: query.limit ? parseInt(query.limit, 10) : 10,
            sortBy: query.sortBy || 'created_at',
            sortDirection: query.sortDirection || 'desc',
        };
        return await this.getEmployeeAppointmentsService.getAllEmployeeAppointments(employeeId, params);
    }
};
exports.GetEmployeeAppointmentsController = GetEmployeeAppointmentsController;
__decorate([
    (0, common_1.Get)(routes_1.routes.employees.getAllAppointments),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_employee_appointments_request_dto_1.GetEmployeeAppointmentsRequest]),
    __metadata("design:returntype", Promise)
], GetEmployeeAppointmentsController.prototype, "getAllEmployeeAppointments", null);
exports.GetEmployeeAppointmentsController = GetEmployeeAppointmentsController = __decorate([
    (0, common_1.Controller)(routes_1.routes.employees.root),
    __metadata("design:paramtypes", [get_employee_appointments_service_1.GetEmployeeAppointmentsService])
], GetEmployeeAppointmentsController);
//# sourceMappingURL=get-employee-appointments.controller.js.map