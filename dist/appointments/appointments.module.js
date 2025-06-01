"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentsModule = void 0;
const common_1 = require("@nestjs/common");
const supabase_request_provider_1 = require("../auth/providers/supabase-request.provider");
const appointments_helpers_1 = require("../helpers/appointments.helpers");
const assign_staff_appointments_controller_1 = require("./assign-staff-appointments/assign-staff-appointments.controller");
const assign_staff_appointments_service_1 = require("./assign-staff-appointments/assign-staff-appointments.service");
const create_appointment_controller_1 = require("./create-appointment/create-appointment.controller");
const create_appointment_service_1 = require("./create-appointment/create-appointment.service");
const download_appointment_files_controller_1 = require("./download-appointment-files/download-appointment-files.controller");
const download_appointmnet_files_service_1 = require("./download-appointment-files/download-appointmnet-files.service");
const get_all_appointments_by_customer_controller_1 = require("./get-all-appointments-by-customer/get-all-appointments-by-customer.controller");
const get_all_appointments_by_customer_service_1 = require("./get-all-appointments-by-customer/get-all-appointments-by-customer.service");
const get_all_appointments_controller_1 = require("./get-all-appointments/get-all-appointments.controller");
const get_all_appointments_service_1 = require("./get-all-appointments/get-all-appointments.service");
const get_appointment_controller_1 = require("./get-appointment/get-appointment.controller");
const get_appointment_service_1 = require("./get-appointment/get-appointment.service");
const get_available_day_slots_controller_1 = require("./get-available-day-slot/get-available-day-slots.controller");
const get_available_day_slots_service_1 = require("./get-available-day-slot/get-available-day-slots.service");
const retrieve_appointment_files_controller_1 = require("./retrieve-appointment-files/retrieve-appointment-files.controller");
const retrieve_appointment_files_service_1 = require("./retrieve-appointment-files/retrieve-appointment-files.service");
const update_appointment_status_controller_1 = require("./update-appointment-status/update-appointment-status.controller");
const update_appointment_status_service_1 = require("./update-appointment-status/update-appointment-status.service");
const upload_appointment_files_controller_1 = require("./upload-appointment-files/upload-appointment-files.controller");
const upload_appointment_files_service_1 = require("./upload-appointment-files/upload-appointment-files.service");
let AppointmentsModule = class AppointmentsModule {
};
exports.AppointmentsModule = AppointmentsModule;
exports.AppointmentsModule = AppointmentsModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            create_appointment_controller_1.CreateAppointmentController,
            get_available_day_slots_controller_1.GetAvailableDaySlotsController,
            get_all_appointments_controller_1.GetAllAppointmentsController,
            get_appointment_controller_1.GetAppointmentController,
            assign_staff_appointments_controller_1.AssignStaffAppointmentsController,
            update_appointment_status_controller_1.UpdateAppointmentStatusController,
            get_all_appointments_by_customer_controller_1.GetAllAppointmentsByCustomerController,
            upload_appointment_files_controller_1.UploadAppointmentFilesController,
            retrieve_appointment_files_controller_1.RetrieveAppointmentFilesController,
            download_appointment_files_controller_1.DownloadAppointmentFilesController,
        ],
        providers: [
            supabase_request_provider_1.SupabaseRequestProvider,
            create_appointment_service_1.CreateAppointmentService,
            get_available_day_slots_service_1.GetAvailableDaySlotSService,
            get_all_appointments_service_1.GetAllAppointmentsService,
            get_appointment_service_1.GetAppointmentService,
            assign_staff_appointments_service_1.AssignStaffAppointmentsService,
            update_appointment_status_service_1.UpdateAppointmentStatusService,
            get_all_appointments_service_1.GetAllAppointmentsService,
            get_all_appointments_by_customer_service_1.GetAllAppointmentsByCustomerService,
            upload_appointment_files_service_1.UploadAppointmentFilesService,
            appointments_helpers_1.AppointmentsHelper,
            retrieve_appointment_files_service_1.RetrieveAppointmentFilesService,
            download_appointmnet_files_service_1.DownloadAppointmentFilesService,
        ],
    })
], AppointmentsModule);
//# sourceMappingURL=appointments.module.js.map