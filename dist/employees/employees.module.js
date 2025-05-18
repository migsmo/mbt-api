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
const customers_helper_1 = require("../helpers/customers.helper");
const employees_helpers_1 = require("../helpers/employees.helpers");
const services_helper_1 = require("../helpers/services.helper");
const create_employee_controller_1 = require("./create-employee/create-employee.controller");
const create_employee_service_1 = require("./create-employee/create-employee.service");
const delete_employee_controller_1 = require("./delete-employee/delete-employee.controller");
const delete_employee_service_1 = require("./delete-employee/delete-employee.service");
const get_all_employees_controller_1 = require("./get-all-employees/get-all-employees.controller");
const get_all_employees_service_1 = require("./get-all-employees/get-all-employees.service");
const get_employee_appointments_controller_1 = require("./get-employee-appointments/get-employee-appointments.controller");
const get_employee_appointments_service_1 = require("./get-employee-appointments/get-employee-appointments.service");
const get_employee_controller_1 = require("./get-employee/get-employee.controller");
const get_employee_service_1 = require("./get-employee/get-employee.service");
const update_employee_controller_1 = require("./update-employee/update-employee.controller");
const update_employee_service_1 = require("./update-employee/update-employee.service");
let EmployeesModule = class EmployeesModule {
};
exports.EmployeesModule = EmployeesModule;
exports.EmployeesModule = EmployeesModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            get_all_employees_controller_1.GetAllEmployeesController,
            create_employee_controller_1.CreateEmployeeController,
            get_employee_controller_1.GetEmployeeController,
            update_employee_controller_1.UpdateEmployeeController,
            delete_employee_controller_1.DeleteEmployeeController,
            get_employee_appointments_controller_1.GetEmployeeAppointmentsController,
        ],
        providers: [
            get_all_employees_service_1.GetAllEmployeesService,
            supabase_request_provider_1.SupabaseRequestProvider,
            create_employee_service_1.CreateEmployeeService,
            get_employee_service_1.GetEmployeeService,
            update_employee_service_1.UpdateEmployeeService,
            delete_employee_service_1.DeleteEmployeeService,
            get_employee_appointments_service_1.GetEmployeeAppointmentsService,
            get_employee_service_1.GetEmployeeService,
            appointments_helpers_1.AppointmentsHelper,
            employees_helpers_1.EmployeesHelper,
            services_helper_1.ServicesHelper,
            customers_helper_1.CustomerHelper,
        ],
    })
], EmployeesModule);
//# sourceMappingURL=employees.module.js.map