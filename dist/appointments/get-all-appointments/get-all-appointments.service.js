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
exports.GetAllAppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let GetAllAppointmentsService = class GetAllAppointmentsService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getAllAppointments(request) {
        const { startDate, endDate } = request;
        const formattedStartDate = new Date(startDate);
        const formattedEndDate = new Date(endDate);
        formattedStartDate.setHours(0, 0, 0, 0);
        formattedEndDate.setHours(0, 0, 0, 0);
        if (isNaN(formattedStartDate.getTime()) ||
            isNaN(formattedEndDate.getTime())) {
            throw new base_error_1.BaseError('Invalid day format.');
        }
        const { data: appointments, error } = await this.supabase
            .from('appointments')
            .select('*')
            .gte('date_time', formattedStartDate.toISOString())
            .lte('date_time', formattedEndDate.toISOString());
        if (error)
            throw new Error(error.message);
        const { count } = await this.supabase
            .from('appointments')
            .select('*', { count: 'exact', head: true })
            .gte('date_time', formattedStartDate.toISOString())
            .lte('date_time', formattedEndDate.toISOString());
        const appointmentResponse = await Promise.all(appointments.map((appointmentData) => this.mapAppointmentData(appointmentData)));
        return {
            appointments: appointmentResponse,
            appointmentCount: count || 0,
        };
    }
    async mapAppointmentData(appointment) {
        const appointmentService = await this.supabase
            .from('appointment_services')
            .select('*')
            .eq('appointment_id', appointment.id);
        const appointmentServiceData = appointmentService.data;
        const selectedServices = appointmentServiceData.map((service) => {
            return {
                serviceId: service.service_id,
                staffIds: service.employee_ids,
            };
        });
        return {
            id: appointment.id,
            createdAt: new Date(appointment.created_at),
            dateTime: new Date(appointment.date_time),
            additionalRemarks: appointment.additional_remarks,
            selectedServices: selectedServices,
            customerAssigned: appointment.customer_assigned,
            isCompleted: appointment.is_completed,
        };
    }
};
exports.GetAllAppointmentsService = GetAllAppointmentsService;
exports.GetAllAppointmentsService = GetAllAppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], GetAllAppointmentsService);
//# sourceMappingURL=get-all-appointments.service.js.map