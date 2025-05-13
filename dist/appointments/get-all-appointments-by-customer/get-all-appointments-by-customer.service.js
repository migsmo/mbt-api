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
exports.GetAllAppointmentsByCustomerService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let GetAllAppointmentsByCustomerService = class GetAllAppointmentsByCustomerService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getAllAppointmentsByCustomer(customerId, params) {
        const { page, limit, sortBy, sortDirection } = params;
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        const { count, error: countError } = await this.supabase
            .from('appointments')
            .select('*', { count: 'exact', head: true })
            .eq('customer_assigned', customerId);
        if (countError) {
            throw new base_error_1.BaseError(`Failed to count appointments: ${countError.message}`);
        }
        const { data, error } = await this.supabase
            .from('appointments')
            .select('*')
            .eq('customer_assigned', customerId)
            .order(sortBy, { ascending: sortDirection === 'asc' })
            .range(from, to);
        if (error) {
            throw new base_error_1.BaseError(`Failed to get appointments: ${error.message}`);
        }
        const appointments = await Promise.all(data.map((appointmentData) => this.mapAppointmentData(appointmentData)));
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
        const response = {
            customerId: customerId,
            appointments: appointments,
            meta,
        };
        return response;
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
exports.GetAllAppointmentsByCustomerService = GetAllAppointmentsByCustomerService;
exports.GetAllAppointmentsByCustomerService = GetAllAppointmentsByCustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], GetAllAppointmentsByCustomerService);
//# sourceMappingURL=get-all-appointments-by-customer.service.js.map