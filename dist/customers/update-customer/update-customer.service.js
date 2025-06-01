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
exports.UpdateCustomerService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let UpdateCustomerService = class UpdateCustomerService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async updateCustomer(request) {
        const updateRequest = {
            first_name: request.firstName,
            last_name: request.lastName,
            address: request.address,
            contact_no: request.contactNumber,
            email: request.email,
            occupation: request.occupation,
            additional_remarks: request.additionalRemarks,
        };
        const customer = await this.supabase
            .from('customers')
            .update(updateRequest)
            .eq('id', request.id)
            .is('is_deleted', false)
            .select()
            .single();
        const customerData = customer.data;
        if (customer.error) {
            throw new base_error_1.BaseError(`Failed to update customer: ${customer.error.message}`);
        }
        const appointments = await this.supabase
            .from('appointments')
            .select('id, unpaid_amount')
            .eq('customer_assigned', request.id)
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
exports.UpdateCustomerService = UpdateCustomerService;
exports.UpdateCustomerService = UpdateCustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], UpdateCustomerService);
//# sourceMappingURL=update-customer.service.js.map