"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const appointment_billings_module_1 = require("./appointment-billings/appointment-billings.module");
const appointments_module_1 = require("./appointments/appointments.module");
const auth_module_1 = require("./auth/auth.module");
const common_module_1 = require("./commons/common.module");
const customers_module_1 = require("./customers/customers.module");
const employees_module_1 = require("./employees/employees.module");
const service_module_1 = require("./services/service.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            config_1.ConfigModule.forRoot({
                envFilePath: process.env.NODE_ENV === 'production' ? '.prod.env' : '.env',
                isGlobal: true,
            }),
            common_module_1.CommonModule,
            service_module_1.ServicesModule,
            appointments_module_1.AppointmentsModule,
            employees_module_1.EmployeesModule,
            customers_module_1.CustomersModule,
            appointment_billings_module_1.AppointmentBillingsModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map