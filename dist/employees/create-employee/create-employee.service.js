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
exports.CreateEmployeeService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
let CreateEmployeeService = class CreateEmployeeService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async createEmployee(request) {
        const { firstName, lastName, email, contactNumber } = request;
        const employee = await this.supabase
            .from('employees')
            .insert({
            first_name: firstName,
            last_name: lastName,
            email: email,
            contact_no: contactNumber,
        })
            .select('*')
            .single();
        const employeeData = employee.data;
        if (employee.error) {
            throw new Error(`Failed to create employee: ${employee.error.message}`);
        }
        const data = {
            id: employeeData.id,
            firstName: employeeData.first_name,
            lastName: employeeData.last_name,
            email: employeeData.email,
            contactNumber: employeeData.contact_no,
            createdAt: new Date(employeeData.created_at),
        };
        return data;
    }
};
exports.CreateEmployeeService = CreateEmployeeService;
exports.CreateEmployeeService = CreateEmployeeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], CreateEmployeeService);
//# sourceMappingURL=create-employee.service.js.map