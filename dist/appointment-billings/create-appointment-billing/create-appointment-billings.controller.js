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
exports.CreateAppointmentBillingController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const create_appointment_billing_service_1 = require("./create-appointment-billing.service");
const create_appointment_billing_request_dto_1 = require("./dto/create-appointment-billing-request.dto");
let CreateAppointmentBillingController = class CreateAppointmentBillingController {
    createAppointmentBillingService;
    constructor(createAppointmentBillingService) {
        this.createAppointmentBillingService = createAppointmentBillingService;
    }
    async createAppointmentBilling(request) {
        return await this.createAppointmentBillingService.createAppointmentBilling(request);
    }
};
exports.CreateAppointmentBillingController = CreateAppointmentBillingController;
__decorate([
    (0, common_1.Post)(routes_1.routes.appointmentBillings.create),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_appointment_billing_request_dto_1.CreateAppointmentBillingRequest]),
    __metadata("design:returntype", Promise)
], CreateAppointmentBillingController.prototype, "createAppointmentBilling", null);
exports.CreateAppointmentBillingController = CreateAppointmentBillingController = __decorate([
    (0, common_1.Controller)(routes_1.routes.appointmentBillings.root),
    __metadata("design:paramtypes", [create_appointment_billing_service_1.CreateAppointmentBillingService])
], CreateAppointmentBillingController);
//# sourceMappingURL=create-appointment-billings.controller.js.map