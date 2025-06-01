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
exports.GetAllCustomersService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_error_1 = require("../../errors/base-error");
let GetAllCustomersService = class GetAllCustomersService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getAllCustomersService(params) {
        const { page, limit, sortBy, sortDirection } = params;
        const { count, error: countError } = await this.supabase
            .from('customers')
            .select('*', { count: 'exact', head: true })
            .is('is_deleted', false);
        if (countError) {
            throw new base_error_1.BaseError(`Failed to count customers: ${countError.message}`);
        }
        const query = this.supabase
            .from('customers')
            .select('*')
            .is('is_deleted', false);
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
        if (error) {
            throw new base_error_1.BaseError(`Failed to get customers: ${error.message}`);
        }
        const customers = await Promise.all(data.map((customerData) => this.mapCustomerData(customerData)));
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
            customers,
            meta,
        };
    }
    async mapCustomerData(customerData) {
        const appointments = await this.supabase
            .from('appointments')
            .select('id, unpaid_amount')
            .eq('customer_assigned', customerData.id)
            .is('is_cancelled', false);
        const appointmentData = appointments.data;
        let outstandingBalance = 0;
        if (appointmentData.length > 0) {
            appointmentData.forEach((appointment) => {
                outstandingBalance += appointment.unpaid_amount;
            });
        }
        return {
            id: customerData.id,
            createdAt: new Date(customerData.created_at),
            firstName: customerData.first_name,
            lastName: customerData.last_name,
            email: customerData.email,
            address: customerData.address,
            contactNumber: customerData.contact_no,
            occupation: customerData.occupation,
            additionalRemarks: customerData.additional_remarks,
            outstandingBalance: outstandingBalance || 0,
        };
    }
};
exports.GetAllCustomersService = GetAllCustomersService;
exports.GetAllCustomersService = GetAllCustomersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_REQUEST_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], GetAllCustomersService);
//# sourceMappingURL=get-all-customers.service.js.map