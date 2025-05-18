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
exports.GetEmployeeAppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
const appointments_helpers_1 = require("../../helpers/appointments.helpers");
const customers_helper_1 = require("../../helpers/customers.helper");
const employees_helpers_1 = require("../../helpers/employees.helpers");
const services_helper_1 = require("../../helpers/services.helper");
let GetEmployeeAppointmentsService = class GetEmployeeAppointmentsService {
    supabase;
    appointmentsHelper;
    servicesHelper;
    customerHelper;
    employeesHelper;
    constructor(supabase, appointmentsHelper, servicesHelper, customerHelper, employeesHelper) {
        this.supabase = supabase;
        this.appointmentsHelper = appointmentsHelper;
        this.servicesHelper = servicesHelper;
        this.customerHelper = customerHelper;
        this.employeesHelper = employeesHelper;
    }
    async getAllEmployeeAppointments(employeeId, params) {
        const { page, limit, sortDirection } = params;
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        const appointmentService = await this.supabase
            .from('appointment_services')
            .select('*')
            .contains('employee_ids', [employeeId])
            .range(from, to);
        const appointmentServicesData = appointmentService.data;
        if (appointmentService.error) {
            throw new base_error_1.BaseError(`Failed to get employee appointments: ${appointmentService.error.message}`);
        }
        const appointmentIds = [
            ...new Set(appointmentServicesData.map((service) => service.appointment_id)),
        ];
        const serviceIds = [
            ...new Set(appointmentServicesData.map((service) => service.service_id)),
        ];
        const services = await this.servicesHelper.getServicesByIds(this.supabase, serviceIds);
        const appointments = await this.appointmentsHelper.getAppointmentByIds(this.supabase, appointmentIds, 'date_time', sortDirection);
        const formattedAppointments = await Promise.all(appointments.map((appointment) => this.getAppointment(appointment, appointmentServicesData, services)));
        const { data: countData, error: countError } = await this.supabase
            .from('distinct_appointment_counts_per_employee')
            .select('appointment_count')
            .eq('employee_id', employeeId)
            .single();
        const count = countData?.appointment_count;
        if (countError) {
            throw new base_error_1.BaseError(`Failed to count employee appointments: ${countError.message}`);
        }
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
        return {
            data: {
                employeeId: employeeId,
                appointments: formattedAppointments,
            },
            meta,
        };
    }
    async getAppointment(appointment, appointmentServicesList, services) {
        const selectedAppointmentService = appointmentServicesList.filter((service) => service.appointment_id === appointment.id);
        const serviceMap = new Map(services.map((s) => [s.id, s]));
        const serviceNames = selectedAppointmentService.map((service) => {
            const serviceData = serviceMap.get(service.service_id);
            return serviceData?.name || '';
        });
        const commissionRate = this.employeesHelper.calculateEmployeeCommissionByAppointmentServices(selectedAppointmentService, services);
        const customer = await this.customerHelper.getCustomerById(this.supabase, appointment.customer_assigned);
        return {
            appointmentId: appointment.id,
            appointmentDate: new Date(appointment.date_time),
            services: serviceNames,
            customerName: customer.first_name + ' ' + customer.last_name,
            commission: commissionRate.toNumber(),
        };
    }
};
exports.GetEmployeeAppointmentsService = GetEmployeeAppointmentsService;
exports.GetEmployeeAppointmentsService = GetEmployeeAppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __param(1, (0, common_1.Inject)(appointments_helpers_1.AppointmentsHelper)),
    __param(2, (0, common_1.Inject)(services_helper_1.ServicesHelper)),
    __param(3, (0, common_1.Inject)(customers_helper_1.CustomerHelper)),
    __param(4, (0, common_1.Inject)(employees_helpers_1.EmployeesHelper)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient,
        appointments_helpers_1.AppointmentsHelper,
        services_helper_1.ServicesHelper,
        customers_helper_1.CustomerHelper,
        employees_helpers_1.EmployeesHelper])
], GetEmployeeAppointmentsService);
//# sourceMappingURL=get-employee-appointments.service.js.map