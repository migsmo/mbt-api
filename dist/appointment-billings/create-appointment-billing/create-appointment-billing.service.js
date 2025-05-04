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
exports.CreateAppointmentBillingService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let CreateAppointmentBillingService = class CreateAppointmentBillingService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async createAppointmentBilling(request) {
        const { appointmentId, datePaid, paymentType, amount } = request;
        const appointment = await this.supabase
            .from('appointments')
            .select('*')
            .eq('id', appointmentId)
            .single();
        const appointmentData = appointment.data;
        if (!appointmentData || appointment.error?.message) {
            throw new base_error_1.BaseError('Appointment not found');
        }
        const appointmentBillings = await this.supabase
            .from('appointment_billings')
            .insert({
            appointment_id: appointmentId,
            date_paid: new Date(datePaid),
            payment_type: paymentType,
            amount: amount,
        })
            .select('*')
            .single();
        const billingData = appointmentBillings.data;
        if (appointmentBillings.error)
            throw new base_error_1.BaseError(appointmentBillings.error.message);
        const data = {
            appointmentBillingId: billingData.id,
            appointmentId: billingData.appointment_id,
            datePaid: billingData.date_paid,
            paymentType: billingData.payment_type,
            amount: billingData.amount,
        };
        return data;
    }
};
exports.CreateAppointmentBillingService = CreateAppointmentBillingService;
exports.CreateAppointmentBillingService = CreateAppointmentBillingService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], CreateAppointmentBillingService);
//# sourceMappingURL=create-appointment-billing.service.js.map