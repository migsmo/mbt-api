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
exports.GetEmployeeService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const employees_helpers_1 = require("../../helpers/employees.helpers");
let GetEmployeeService = class GetEmployeeService {
    supabase;
    employeesHelper;
    constructor(supabase, employeesHelper) {
        this.supabase = supabase;
        this.employeesHelper = employeesHelper;
    }
    async getEmployee(id) {
        const employee = await this.supabase
            .from('employees')
            .select('*')
            .eq('id', id)
            .single();
        const employeeData = employee.data;
        if (employee.error) {
            throw new Error(employee.error.message);
        }
        const commission = await this.employeesHelper.getEmployeeCommission(this.supabase, employeeData.id, new Date().getFullYear(), new Date().getMonth() + 1);
        const data = {
            id: employeeData.id,
            firstName: employeeData.first_name,
            lastName: employeeData.last_name,
            contactNumber: employeeData.contact_no,
            email: employeeData.email,
            createdAt: new Date(employeeData.created_at),
            commission: commission.toNumber(),
        };
        return data;
    }
};
exports.GetEmployeeService = GetEmployeeService;
exports.GetEmployeeService = GetEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __param(1, (0, common_1.Inject)(employees_helpers_1.EmployeesHelper)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient,
        employees_helpers_1.EmployeesHelper])
], GetEmployeeService);
//# sourceMappingURL=get-employee.service.js.map