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
exports.GetServicesController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const get_services_request_dto_1 = require("./dto/get-services-request.dto");
const get_services_service_1 = require("./get-services.service");
let GetServicesController = class GetServicesController {
    getServicesService;
    constructor(getServicesService) {
        this.getServicesService = getServicesService;
    }
    async getServices(query) {
        const params = {
            page: query.page ? parseInt(query.page, 10) : 1,
            limit: query.limit ? parseInt(query.limit, 10) : 10,
            sortBy: query.sortBy || 'created_at',
            sortDirection: query.sortDirection || 'desc',
        };
        return this.getServicesService.getServices(params);
    }
};
exports.GetServicesController = GetServicesController;
__decorate([
    (0, common_1.Get)(routes_1.routes.service.getAll),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_services_request_dto_1.GetServicesRequest]),
    __metadata("design:returntype", Promise)
], GetServicesController.prototype, "getServices", null);
exports.GetServicesController = GetServicesController = __decorate([
    (0, common_1.Controller)(routes_1.routes.service.root),
    __metadata("design:paramtypes", [get_services_service_1.GetServicesService])
], GetServicesController);
//# sourceMappingURL=get-services.controller.js.map