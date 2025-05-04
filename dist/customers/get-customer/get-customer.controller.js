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
exports.GetCustomerController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const get_customer_service_1 = require("./get-customer.service");
let GetCustomerController = class GetCustomerController {
    getCustomerService;
    constructor(getCustomerService) {
        this.getCustomerService = getCustomerService;
    }
    async getCustomerById(id) {
        return await this.getCustomerService.getCustomerById(id);
    }
};
exports.GetCustomerController = GetCustomerController;
__decorate([
    (0, common_1.Get)(routes_1.routes.customers.get),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GetCustomerController.prototype, "getCustomerById", null);
exports.GetCustomerController = GetCustomerController = __decorate([
    (0, common_1.Controller)(routes_1.routes.customers.root),
    __metadata("design:paramtypes", [get_customer_service_1.GetCustomerService])
], GetCustomerController);
//# sourceMappingURL=get-customer.controller.js.map