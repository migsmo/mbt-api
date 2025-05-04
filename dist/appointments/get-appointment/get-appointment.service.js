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
exports.GetAppointmentService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let GetAppointmentService = class GetAppointmentService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getAppointmentById(id) {
        const appointment = await this.supabase
            .from('appointments')
            .select('*')
            .eq('id', id)
            .single();
        const appointmentData = appointment.data;
        if (appointment.error) {
            throw new base_error_1.BaseError(`Failed to get appointment: ${appointment.error.message}`);
        }
        const appointmentService = await this.supabase
            .from('appointment_services')
            .select('*')
            .eq('appointment_id', appointmentData.id);
        const appointmentServiceData = appointmentService.data;
        const selectedServices = appointmentServiceData.map((service) => {
            return {
                serviceId: service.service_id,
                staffIds: service.employee_ids,
            };
        });
        const response = {
            id: appointmentData.id,
            createdAt: new Date(appointmentData.created_at),
            dateTime: new Date(appointmentData.date_time),
            additionalRemarks: appointmentData.additional_remarks,
            selectedServices: selectedServices,
            customerAssigned: appointmentData.customer_assigned,
            isCompleted: appointmentData.is_completed,
        };
        return response;
    }
};
exports.GetAppointmentService = GetAppointmentService;
exports.GetAppointmentService = GetAppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], GetAppointmentService);
//# sourceMappingURL=get-appointment.service.js.map