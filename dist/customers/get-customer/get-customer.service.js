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
exports.GetCustomerService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_error_1 = require("../../errors/base-error");
let GetCustomerService = class GetCustomerService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getCustomerById(id) {
        const customer = await this.supabase
            .from('customers')
            .select('*')
            .eq('id', id)
            .is('is_deleted', false)
            .single();
        const customerData = customer.data;
        if (customer.error) {
            throw new base_error_1.BaseError(`Failed to get customer: ${customer.error.message}`);
        }
        const appointments = await this.supabase
            .from('appointments')
            .select('id, unpaid_amount')
            .eq('customer_assigned', id)
            .is('is_cancelled', false);
        const appointmentData = appointments.data;
        let outstandingBalance = 0;
        if (appointmentData.length > 0) {
            appointmentData.forEach((appointment) => {
                outstandingBalance += appointment.unpaid_amount;
            });
        }
        const response = {
            id: customerData.id,
            createdAt: new Date(customerData.created_at),
            firstName: customerData.first_name,
            lastName: customerData.last_name,
            address: customerData.address,
            contactNumber: customerData.contact_no,
            email: customerData.email,
            occupation: customerData.occupation,
            additionalRemarks: customerData.additional_remarks,
            outstandingBalance: outstandingBalance || 0,
        };
        return response;
    }
};
exports.GetCustomerService = GetCustomerService;
exports.GetCustomerService = GetCustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_REQUEST_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], GetCustomerService);
//# sourceMappingURL=get-customer.service.js.map