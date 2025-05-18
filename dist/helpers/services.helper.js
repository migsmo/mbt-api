"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesHelper = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("../errors/base-error");
let ServicesHelper = class ServicesHelper {
    async getServiceById(supabase, serviceId) {
        const service = await supabase
            .from('services')
            .select('*')
            .eq('id', serviceId)
            .is('is_deleted', false)
            .single();
        if (service.error)
            throw new base_error_1.BaseError(service.error.message);
        const serviceData = service.data;
        return serviceData;
    }
    async getServicesByIds(supabase, serviceIds) {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .in('id', serviceIds)
            .is('is_deleted', false);
        if (error)
            throw new base_error_1.BaseError(error.message);
        return data;
    }
};
exports.ServicesHelper = ServicesHelper;
exports.ServicesHelper = ServicesHelper = __decorate([
    (0, common_1.Injectable)()
], ServicesHelper);
//# sourceMappingURL=services.helper.js.map