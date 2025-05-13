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
exports.UpodateEmployeeController = void 0;
const common_1 = require("@nestjs/common");
const routes_1 = require("../../config/routes");
const update_employee_request_dto_1 = require("./dto/update-employee-request.dto");
const update_employee_service_1 = require("./update-employee.service");
let UpodateEmployeeController = class UpodateEmployeeController {
    updateEmployeeService;
    constructor(updateEmployeeService) {
        this.updateEmployeeService = updateEmployeeService;
    }
    async updateEmployee(request) {
        return await this.updateEmployeeService.updateEmployee(request);
    }
};
exports.UpodateEmployeeController = UpodateEmployeeController;
__decorate([
    (0, common_1.Put)(routes_1.routes.employees.update),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_employee_request_dto_1.UpdateEmployeeRequest]),
    __metadata("design:returntype", Promise)
], UpodateEmployeeController.prototype, "updateEmployee", null);
exports.UpodateEmployeeController = UpodateEmployeeController = __decorate([
    (0, common_1.Controller)(routes_1.routes.employees.root),
    __metadata("design:paramtypes", [update_employee_service_1.UpdateEmployeeService])
], UpodateEmployeeController);
//# sourceMappingURL=update-employee.controller.js.map