"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerHelper = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("../errors/base-error");
let CustomerHelper = class CustomerHelper {
    async getCustomerById(supabase, customerId) {
        const customer = await supabase
            .from('customers')
            .select('*')
            .eq('id', customerId)
            .is('is_deleted', false)
            .single();
        if (customer.error)
            throw new base_error_1.BaseError(customer.error.message);
        const customerData = customer.data;
        return customerData;
    }
};
exports.CustomerHelper = CustomerHelper;
exports.CustomerHelper = CustomerHelper = __decorate([
    (0, common_1.Injectable)()
], CustomerHelper);
//# sourceMappingURL=customers.helper.js.map