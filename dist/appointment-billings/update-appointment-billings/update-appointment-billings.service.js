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
exports.UpdateAppointmentBillingsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let UpdateAppointmentBillingsService = class UpdateAppointmentBillingsService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async updateAppointmentBillings(request) {
        const { appointmentId, billingIds } = request;
        const appointment = await this.supabase
            .from('appointments')
            .select('*')
            .eq('id', appointmentId)
            .single();
        const appointmentData = appointment.data;
        if (appointment.error || !appointmentData) {
            throw new base_error_1.BaseError('Appointment not found');
        }
        const { data: currentBillings, error: billingsError } = await this.supabase
            .from('appointment_billings')
            .select('id, amount')
            .is('is_deleted', false)
            .eq('appointment_id', appointmentId);
        if (billingsError) {
            throw new base_error_1.BaseError('Failed to fetch current billings');
        }
        const currentBillingsData = currentBillings;
        const currentBillingIds = currentBillingsData.map((b) => b.id);
        console.log('currentBillingIds', currentBillingIds);
        const billingsToRemove = currentBillingIds.filter((id) => !billingIds.includes(id));
        console.log('billingsToRemove', billingsToRemove);
        let totalRemovedAmount = 0;
        currentBillingsData.forEach((billing) => {
            if (billingsToRemove.includes(billing.id)) {
                totalRemovedAmount += billing.amount;
            }
        });
        console.log('totalRemovedAmount', totalRemovedAmount);
        console.log('appointmentData.unpaid_amount', appointmentData.unpaid_amount);
        await this.supabase
            .from('appointments')
            .update({
            unpaid_amount: appointmentData.unpaid_amount + totalRemovedAmount,
        })
            .eq('id', appointmentId);
        if (billingsToRemove.length > 0) {
            const { error: unlinkError } = await this.supabase
                .from('appointment_billings')
                .update({ is_deleted: true })
                .in('id', billingsToRemove);
            if (unlinkError) {
                throw new base_error_1.BaseError('Failed to delete removed billings');
            }
        }
        const { data: updatedBillings, error: fetchError } = await this.supabase
            .from('appointment_billings')
            .select('*')
            .is('is_deleted', false)
            .eq('appointment_id', appointmentId);
        if (fetchError) {
            throw new base_error_1.BaseError('Failed to fetch updated billings');
        }
        return {
            appointmentId,
            updatedBillings: updatedBillings,
        };
    }
};
exports.UpdateAppointmentBillingsService = UpdateAppointmentBillingsService;
exports.UpdateAppointmentBillingsService = UpdateAppointmentBillingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], UpdateAppointmentBillingsService);
//# sourceMappingURL=update-appointment-billings.service.js.map