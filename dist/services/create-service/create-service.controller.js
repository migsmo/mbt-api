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
exports.CreateServiceController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const create_service_service_1 = require("./create-service.service");
const create_service_request_dto_1 = require("./dto/create-service-request.dto");
let CreateServiceController = class CreateServiceController {
    createServiceService;
    constructor(createServiceService) {
        this.createServiceService = createServiceService;
    }
    async create(request) {
        return await this.createServiceService.createService(request);
    }
};
exports.CreateServiceController = CreateServiceController;
__decorate([
    (0, common_1.Post)(routes_1.routes.service.create),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_service_request_dto_1.CreateServiceRequest]),
    __metadata("design:returntype", Promise)
], CreateServiceController.prototype, "create", null);
exports.CreateServiceController = CreateServiceController = __decorate([
    (0, common_1.Controller)(routes_1.routes.service.root),
    __metadata("design:paramtypes", [create_service_service_1.CreateServiceService])
], CreateServiceController);
//# sourceMappingURL=create-service.controller.js.map