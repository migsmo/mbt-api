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
exports.CreateCustomerController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const create_customer_service_1 = require("./create-customer.service");
const create_customer_request_dto_1 = require("./dto/create-customer-request.dto");
let CreateCustomerController = class CreateCustomerController {
    createCustomerService;
    constructor(createCustomerService) {
        this.createCustomerService = createCustomerService;
    }
    async create(request) {
        return await this.createCustomerService.createCustomer(request);
    }
};
exports.CreateCustomerController = CreateCustomerController;
__decorate([
    (0, common_1.Post)(routes_1.routes.customers.create),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_customer_request_dto_1.CreateCustomerRequest]),
    __metadata("design:returntype", Promise)
], CreateCustomerController.prototype, "create", null);
exports.CreateCustomerController = CreateCustomerController = __decorate([
    (0, common_1.Controller)(routes_1.routes.customers.root),
    __metadata("design:paramtypes", [create_customer_service_1.CreateCustomerService])
], CreateCustomerController);
//# sourceMappingURL=create-customer.controller.js.map