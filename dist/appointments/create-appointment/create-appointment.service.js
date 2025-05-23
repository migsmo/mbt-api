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
exports.CreateAppointmentService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const date_fns_tz_1 = require("date-fns-tz");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let CreateAppointmentService = class CreateAppointmentService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async createAppointment(request) {
        const TIMEZONE = 'Asia/Manila';
        const appointmentUtc = new Date(request.dateTime);
        const appointmentTimePH = (0, date_fns_tz_1.toZonedTime)(appointmentUtc, TIMEZONE);
        if (isNaN(appointmentTimePH.getTime())) {
            throw new base_error_1.BaseError('Invalid day format.');
        }
        const nowPH = (0, date_fns_tz_1.toZonedTime)(new Date(), TIMEZONE);
        const maxDatePH = new Date(nowPH);
        maxDatePH.setMonth(maxDatePH.getMonth() + 3);
        maxDatePH.setHours(0, 0, 0, 0);
        if (appointmentTimePH < nowPH || appointmentTimePH > maxDatePH) {
            throw new base_error_1.BaseError('Appointment must be within 3 months from today.');
        }
        const hour = appointmentTimePH.getHours();
        const minute = appointmentTimePH.getMinutes();
        if (hour < 10 || hour >= 22 || (minute !== 0 && minute !== 30)) {
            throw new base_error_1.BaseError('Appointments are only allowed between 10:00 AM and 10:00 PM in 30-minute intervals.');
        }
        const appointmentUTCString = (0, date_fns_tz_1.fromZonedTime)(appointmentTimePH, TIMEZONE).toISOString();
        const { data: existingAppointments, error } = await this.supabase
            .from('appointments')
            .select('id')
            .eq('date_time', appointmentUTCString);
        if (error)
            throw new Error(error.message);
        if (existingAppointments.length >= 4) {
            throw new base_error_1.BaseError('This time slot is fully booked.');
        }
        for (const serviceId of request.selectedServices) {
            await this.checkServiceIsReal(serviceId);
        }
        const createdAtUTC = new Date().toISOString();
        const appointment = await this.supabase
            .from('appointments')
            .insert([
            {
                date_time: appointmentUTCString,
                customer_assigned: request.customerId,
                selected_services: request.selectedServices,
                additional_remarks: request.additionalRemarks ?? '',
                created_at: createdAtUTC,
            },
        ])
            .select()
            .single();
        if (appointment.error)
            throw new base_error_1.BaseError(appointment.error.message);
        const appointmentData = appointment.data;
        const appointmentServicesToInsert = request.selectedServices.map((serviceId) => ({
            appointment_id: appointmentData.id,
            service_id: serviceId,
            employee_ids: [],
        }));
        const { error: appointmentServicesError } = await this.supabase
            .from('appointment_services')
            .insert(appointmentServicesToInsert);
        if (appointmentServicesError) {
            throw new base_error_1.BaseError(appointmentServicesError.message);
        }
        const response = {
            appointmentId: appointmentData.id,
            dateTime: appointmentUTCString,
            customerId: request.customerId,
            selectedServices: request.selectedServices,
            additionalRemarks: request.additionalRemarks ?? '',
            status: 'pending',
            createdAt: new Date(appointmentData.created_at),
        };
        return response;
    }
    async checkServiceIsReal(serviceId) {
        const service = await this.supabase
            .from('services')
            .select('*')
            .eq('id', serviceId)
            .single();
        const serviceData = service.data;
        if (service.error) {
            throw new base_error_1.BaseError(`Failed to get service: ${service.error.message}`);
        }
        return serviceData;
    }
};
exports.CreateAppointmentService = CreateAppointmentService;
exports.CreateAppointmentService = CreateAppointmentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], CreateAppointmentService);
//# sourceMappingURL=create-appointment.service.js.map