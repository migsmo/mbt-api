"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentBillingsModule = void 0;
const common_1 = require("@nestjs/common");
const supabase_request_provider_1 = require("../auth/providers/supabase-request.provider");
const create_appointment_billing_service_1 = require("./create-appointment-billing/create-appointment-billing.service");
const create_appointment_billings_controller_1 = require("./create-appointment-billing/create-appointment-billings.controller");
const get_all_appointment_billings_controller_1 = require("./get-all-appointment-billings/get-all-appointment-billings.controller");
const get_all_appointment_billings_service_1 = require("./get-all-appointment-billings/get-all-appointment-billings.service");
const update_appointment_billings_controller_1 = require("./update-appointment-billings/update-appointment-billings.controller");
const update_appointment_billings_service_1 = require("./update-appointment-billings/update-appointment-billings.service");
let AppointmentBillingsModule = class AppointmentBillingsModule {
};
exports.AppointmentBillingsModule = AppointmentBillingsModule;
exports.AppointmentBillingsModule = AppointmentBillingsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            create_appointment_billings_controller_1.CreateAppointmentBillingController,
            get_all_appointment_billings_controller_1.GetAllAppointmentBillingsController,
            update_appointment_billings_controller_1.UpdateAppointmentBillingsController,
        ],
        providers: [
            supabase_request_provider_1.SupabaseRequestProvider,
            create_appointment_billing_service_1.CreateAppointmentBillingService,
            get_all_appointment_billings_service_1.GetAllAppointmentBillingsService,
            update_appointment_billings_service_1.UpdateAppointmentBillingsService,
        ],
    })
], AppointmentBillingsModule);
//# sourceMappingURL=appointment-billings.module.js.map