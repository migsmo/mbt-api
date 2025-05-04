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
exports.GetAllAppointmentsByCustomerController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const get_all_appointments_by_customer_request_dto_1 = require("./dto/get-all-appointments-by-customer.request.dto");
const get_all_appointments_by_customer_service_1 = require("./get-all-appointments-by-customer.service");
let GetAllAppointmentsByCustomerController = class GetAllAppointmentsByCustomerController {
    getAllAppointmentsByCustomerService;
    constructor(getAllAppointmentsByCustomerService) {
        this.getAllAppointmentsByCustomerService = getAllAppointmentsByCustomerService;
    }
    async getAllAppointmentsByCustomer(id, query) {
        const params = {
            page: query.page ? parseInt(query.page, 10) : 1,
            limit: query.limit ? parseInt(query.limit, 10) : 10,
            sortBy: query.sortBy || 'created_at',
            sortDirection: query.sortDirection || 'desc',
        };
        return await this.getAllAppointmentsByCustomerService.getAllAppointmentsByCustomer(id, params);
    }
};
exports.GetAllAppointmentsByCustomerController = GetAllAppointmentsByCustomerController;
__decorate([
    (0, common_1.Get)(routes_1.routes.appointments.getAllByCustomer),
    __param(0, (0, common_1.Param)('customerId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, get_all_appointments_by_customer_request_dto_1.GetAllAppointmentsByCustomerRequest]),
    __metadata("design:returntype", Promise)
], GetAllAppointmentsByCustomerController.prototype, "getAllAppointmentsByCustomer", null);
exports.GetAllAppointmentsByCustomerController = GetAllAppointmentsByCustomerController = __decorate([
    (0, common_1.Controller)(routes_1.routes.appointments.root),
    __metadata("design:paramtypes", [get_all_appointments_by_customer_service_1.GetAllAppointmentsByCustomerService])
], GetAllAppointmentsByCustomerController);
//# sourceMappingURL=get-all-appointments-by-customer.controller.js.map