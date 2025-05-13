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
exports.GetAllAppointmentBillingsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let GetAllAppointmentBillingsService = class GetAllAppointmentBillingsService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getAllAppointmentBillings(appointmentId) {
        const appointmentBillings = await this.supabase
            .from('appointment_billings')
            .select('*')
            .eq('appointment_id', appointmentId);
        if (appointmentBillings.error?.message) {
            throw new base_error_1.BaseError(appointmentBillings.error?.message);
        }
        const appointmentBillingsData = appointmentBillings.data;
        const appointmentBillingsFormatted = appointmentBillingsData.map((billing) => ({
            appointmentBillingId: billing.id,
            appointmentId: billing.appointment_id,
            datePaid: billing.date_paid,
            paymentType: billing.payment_type,
            amount: billing.amount,
        }));
        const response = {
            appointmentBillings: appointmentBillingsFormatted,
        };
        return response;
    }
};
exports.GetAllAppointmentBillingsService = GetAllAppointmentBillingsService;
exports.GetAllAppointmentBillingsService = GetAllAppointmentBillingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], GetAllAppointmentBillingsService);
//# sourceMappingURL=get-all-appointment-billings.service.js.map