"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesModule = void 0;
const common_1 = require("@nestjs/common");
const supabase_request_provider_1 = require("../auth/providers/supabase-request.provider");
const supabase_provider_1 = require("../auth/providers/supabase.provider");
const create_service_controller_1 = require("./create-service/create-service.controller");
const create_service_service_1 = require("./create-service/create-service.service");
const delete_service_controller_1 = require("./delete-service/delete-service.controller");
const delete_service_service_1 = require("./delete-service/delete-service.service");
const get_service_controller_1 = require("./get-service/get-service.controller");
const get_service_service_1 = require("./get-service/get-service.service");
const get_services_controller_1 = require("./get-services/get-services.controller");
const get_services_service_1 = require("./get-services/get-services.service");
const update_service_controller_1 = require("./update-service/update-service.controller");
const update_service_service_1 = require("./update-service/update-service.service");
let ServicesModule = class ServicesModule {
};
exports.ServicesModule = ServicesModule;
exports.ServicesModule = ServicesModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            create_service_controller_1.CreateServiceController,
            get_service_controller_1.GetServiceController,
            get_services_controller_1.GetServicesController,
            delete_service_controller_1.DeleteServiceController,
            update_service_controller_1.UpdateServiceController,
        ],
        providers: [
            create_service_service_1.CreateServiceService,
            get_service_service_1.GetServiceService,
            get_services_service_1.GetServicesService,
            supabase_provider_1.SupabaseProvider,
            supabase_request_provider_1.SupabaseRequestProvider,
            delete_service_service_1.DeleteServiceService,
            update_service_service_1.UpdateServiceService,
        ],
    })
], ServicesModule);
//# sourceMappingURL=service.module.js.map