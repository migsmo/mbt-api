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
exports.GetAllEmployeesService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_error_1 = require("../../errors/base-error");
const employees_helpers_1 = require("../../helpers/employees.helpers");
let GetAllEmployeesService = class GetAllEmployeesService {
    supabase;
    employeesHelper;
    constructor(supabase, employeesHelper) {
        this.supabase = supabase;
        this.employeesHelper = employeesHelper;
    }
    async getAllEmployees(params) {
        const { page, limit, sortBy, sortDirection, search } = params;
        const { count, error: countError } = await this.supabase
            .from('employees')
            .select('*', { count: 'exact', head: true });
        if (countError) {
            throw new base_error_1.BaseError(`Failed to count employees: ${countError.message}`);
        }
        const query = this.supabase.from('employees').select('*');
        if (search) {
            query.ilike('full_name', `%${search}%`);
        }
        let queryResult;
        if (limit > 0) {
            const from = (page - 1) * limit;
            const to = from + limit - 1;
            queryResult = await query
                .order(sortBy, { ascending: sortDirection === 'asc' })
                .range(from, to);
        }
        else {
            queryResult = await query.order(sortBy, {
                ascending: sortDirection === 'asc',
            });
        }
        const { data, error } = queryResult;
        const employees = await Promise.all(data.map((employeesData) => this.mapEmployeeData(employeesData)));
        if (error) {
            throw new base_error_1.BaseError(`Failed to get services: ${error.message}`);
        }
        const totalItems = count || 0;
        const totalPages = Math.ceil(totalItems / limit);
        const meta = {
            currentPage: page,
            itemsPerPage: limit,
            totalItems,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1,
        };
        return {
            employees,
            meta,
        };
    }
    async mapEmployeeData(employeeData) {
        const commission = await this.employeesHelper.getEmployeeCommission(this.supabase, employeeData.id, new Date().getFullYear(), new Date().getMonth() + 1);
        const employee = {
            id: employeeData.id,
            createdAt: new Date(employeeData.created_at),
            firstName: employeeData.first_name,
            lastName: employeeData.last_name,
            commission: commission.toNumber(),
        };
        if (employeeData.contact_no) {
            employee.contactNumber = employeeData.contact_no;
        }
        if (employeeData.email) {
            employee.email = employeeData.email;
        }
        return employee;
    }
};
exports.GetAllEmployeesService = GetAllEmployeesService;
exports.GetAllEmployeesService = GetAllEmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_REQUEST_CLIENT')),
    __param(1, (0, common_1.Inject)(employees_helpers_1.EmployeesHelper)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient,
        employees_helpers_1.EmployeesHelper])
], GetAllEmployeesService);
//# sourceMappingURL=get-all-employees.service.js.map