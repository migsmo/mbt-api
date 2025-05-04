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
exports.GetAvailableDaySlotsController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const get_available_day_slots_service_1 = require("./get-available-day-slots.service");
let GetAvailableDaySlotsController = class GetAvailableDaySlotsController {
    getAvailableDaySlotSService;
    constructor(getAvailableDaySlotSService) {
        this.getAvailableDaySlotSService = getAvailableDaySlotSService;
    }
    async getAvailableSlotsByDay(day) {
        return await this.getAvailableDaySlotSService.getAvailableSlotsForDay(day);
    }
};
exports.GetAvailableDaySlotsController = GetAvailableDaySlotsController;
__decorate([
    (0, common_1.Get)(routes_1.routes.appointments.getAvailableSlotsByDay),
    __param(0, (0, common_1.Param)('day')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetAvailableDaySlotsController.prototype, "getAvailableSlotsByDay", null);
exports.GetAvailableDaySlotsController = GetAvailableDaySlotsController = __decorate([
    (0, common_1.Controller)(routes_1.routes.appointments.root),
    __metadata("design:paramtypes", [get_available_day_slots_service_1.GetAvailableDaySlotSService])
], GetAvailableDaySlotsController);
//# sourceMappingURL=get-available-day-slots.controller.js.map