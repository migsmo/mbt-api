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
exports.AssignStaffAppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let AssignStaffAppointmentsService = class AssignStaffAppointmentsService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async assignStaffToAppointments(request) {
        const { appointmentId, staffIds } = request;
        const appointment = await this.supabase
            .from('appointments')
            .select('*')
            .eq('id', appointmentId)
            .single();
        const appointmentData = appointment.data;
        if (appointment.error || !appointmentData) {
            throw new base_error_1.BaseError('Appointment not found');
        }
        for (const staffId of staffIds) {
            const staffMember = await this.findStaffById(staffId);
            if (!staffMember) {
                throw new base_error_1.BaseError(`Staff member with ID ${staffId} not found`);
            }
        }
        const appointmentService = await this.supabase
            .from('appointment_services')
            .select('*')
            .eq('appointment_id', appointmentId)
            .eq('service_id', request.serviceId)
            .single();
        const appointmentServiceData = appointmentService.data;
        if (appointmentService.error || !appointmentServiceData) {
            throw new base_error_1.BaseError('Failed to find appointment services', appointmentService.error?.message);
        }
        const updatedAppointmentService = await this.supabase
            .from('appointment_services')
            .update({
            employee_ids: staffIds,
        })
            .eq('id', appointmentServiceData.id)
            .select()
            .single();
        const updatedAppointmentServiceData = updatedAppointmentService.data;
        if (updatedAppointmentService.error) {
            throw new base_error_1.BaseError('Failed to assign staff to appointment', updatedAppointmentService.error.message);
        }
        const response = {
            appointmentId: updatedAppointmentServiceData.appointment_id,
            staffIds: updatedAppointmentServiceData.employee_ids,
            serviceId: updatedAppointmentServiceData.service_id,
        };
        return response;
    }
    async findStaffById(staffId) {
        const staff = await this.supabase
            .from('employees')
            .select('*')
            .eq('id', staffId)
            .single();
        const staffData = staff.data;
        if (staff.error || !staffData) {
            throw new base_error_1.BaseError('Staff not found');
        }
        return staffData;
    }
};
exports.AssignStaffAppointmentsService = AssignStaffAppointmentsService;
exports.AssignStaffAppointmentsService = AssignStaffAppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], AssignStaffAppointmentsService);
//# sourceMappingURL=assign-staff-appointments.service.js.map