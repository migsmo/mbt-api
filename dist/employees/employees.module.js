"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeesModule = void 0;
const common_1 = require("@nestjs/common");
const supabase_request_provider_1 = require("../auth/providers/supabase-request.provider");
const appointments_helpers_1 = require("../helpers/appointments.helpers");
const employees_helpers_1 = require("../helpers/employees.helpers");
const create_employee_controller_1 = require("./create-employee/create-employee.controller");
const create_employee_service_1 = require("./create-employee/create-employee.service");
const get_all_employees_controller_1 = require("./get-all-employees/get-all-employees.controller");
const get_all_employees_service_1 = require("./get-all-employees/get-all-employees.service");
const get_employee_controller_1 = require("./get-employee/get-employee.controller");
const get_employee_service_1 = require("./get-employee/get-employee.service");
let EmployeesModule = class EmployeesModule {
};
exports.EmployeesModule = EmployeesModule;
exports.EmployeesModule = EmployeesModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            get_all_employees_controller_1.GetAllEmployeesController,
            create_employee_controller_1.CreateEmployeeController,
            get_employee_controller_1.GetEmployeeController,
        ],
        providers: [
            get_all_employees_service_1.GetAllEmployeesService,
            supabase_request_provider_1.SupabaseRequestProvider,
            create_employee_service_1.CreateEmployeeService,
            get_employee_service_1.GetEmployeeService,
            appointments_helpers_1.AppointmentsHelper,
            employees_helpers_1.EmployeesHelper,
        ],
    })
], EmployeesModule);
//# sourceMappingURL=employees.module.js.map