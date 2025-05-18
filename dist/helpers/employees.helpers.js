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
exports.EmployeesHelper = void 0;
const common_1 = require("@nestjs/common");
const decimal_js_1 = require("decimal.js");
const appointments_helpers_1 = require("./appointments.helpers");
let EmployeesHelper = class EmployeesHelper {
    appointmentsHelper;
    constructor(appointmentsHelper) {
        this.appointmentsHelper = appointmentsHelper;
    }
    async getEmployeeCommission(supabase, employeeId, year, month) {
        const startDate = new Date(year, month - 1, 1).toISOString();
        const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();
        const appointments = await this.appointmentsHelper.getAppointmentByStartAndEndDate(supabase, startDate, endDate);
        const appointmentIds = appointments.map((a) => a.id);
        if (appointmentIds.length === 0)
            return new decimal_js_1.default(0);
        const appointmentServices = await supabase
            .from('appointment_services')
            .select('appointment_id, service_id, employee_ids')
            .in('appointment_id', appointmentIds)
            .contains('employee_ids', [employeeId]);
        const appointmentServicesData = appointmentServices.data;
        if (appointmentServices.error)
            throw new Error(appointmentServices.error.message);
        if (appointmentServicesData.length === 0)
            return new decimal_js_1.default(0);
        const serviceIds = appointmentServicesData.map((s) => s.service_id);
        const services = await supabase
            .from('services')
            .select('id, price, commission_rate')
            .in('id', serviceIds);
        const servicesData = services.data;
        if (services.error)
            throw new Error(services.error.message);
        const totalCommission = this.calculateEmployeeCommissionByAppointmentServices(appointmentServicesData, servicesData);
        return totalCommission;
    }
    calculateEmployeeCommissionByAppointmentServices(appointmentServicesData, servicesData) {
        const serviceMap = new Map(servicesData.map((s) => [s.id, s]));
        let totalCommission = new decimal_js_1.default(0);
        for (const svc of appointmentServicesData) {
            const service = serviceMap.get(svc.service_id);
            if (!service)
                continue;
            const price = new decimal_js_1.default(Number(service.price));
            const commissionRate = new decimal_js_1.default(Number(service.commission_rate));
            const numEmployees = svc.employee_ids.length || 1;
            const commission = new decimal_js_1.default(price)
                .mul(commissionRate)
                .div(numEmployees);
            totalCommission = totalCommission.add(commission);
        }
        return totalCommission;
    }
};
exports.EmployeesHelper = EmployeesHelper;
exports.EmployeesHelper = EmployeesHelper = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(appointments_helpers_1.AppointmentsHelper)),
    __metadata("design:paramtypes", [appointments_helpers_1.AppointmentsHelper])
], EmployeesHelper);
//# sourceMappingURL=employees.helpers.js.map