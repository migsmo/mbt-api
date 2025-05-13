"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersModule = void 0;
const common_1 = require("@nestjs/common");
const supabase_request_provider_1 = require("../auth/providers/supabase-request.provider");
const create_customer_controller_1 = require("./create-customer/create-customer.controller");
const create_customer_service_1 = require("./create-customer/create-customer.service");
const delete_customer_controller_1 = require("./delete-customer/delete-customer.controller");
const delete_customer_service_1 = require("./delete-customer/delete-customer.service");
const get_all_customers_controller_1 = require("./get-all-customers/get-all-customers.controller");
const get_all_customers_service_1 = require("./get-all-customers/get-all-customers.service");
const get_customer_controller_1 = require("./get-customer/get-customer.controller");
const get_customer_service_1 = require("./get-customer/get-customer.service");
const update_customer_controller_1 = require("./update-customer/update-customer.controller");
const update_customer_service_1 = require("./update-customer/update-customer.service");
let CustomersModule = class CustomersModule {
};
exports.CustomersModule = CustomersModule;
exports.CustomersModule = CustomersModule = __decorate([
    (0, common_1.Module)({
        controllers: [
            get_all_customers_controller_1.GetAllCustomersController,
            get_customer_controller_1.GetCustomerController,
            create_customer_controller_1.CreateCustomerController,
            update_customer_controller_1.UpdateCustomerController,
            delete_customer_controller_1.DeletecustomersController,
        ],
        providers: [
            get_all_customers_service_1.GetAllCustomersService,
            supabase_request_provider_1.SupabaseRequestProvider,
            get_customer_service_1.GetCustomerService,
            create_customer_service_1.CreateCustomerService,
            update_customer_service_1.UpdateCustomerService,
            delete_customer_service_1.DeleteCustomerService,
        ],
    })
], CustomersModule);
//# sourceMappingURL=customers.module.js.map