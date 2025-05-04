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
exports.UpdateServiceService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_error_1 = require("../../errors/base-error");
let UpdateServiceService = class UpdateServiceService {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async updateService(request) {
        const updateRequest = {
            name: request.name,
            price: request.price,
            commission_rate: request.commissionRate,
            description: request.description,
            duration_in_minutes: request.durationInMinutes,
        };
        const service = await this.supabase
            .from('services')
            .update(updateRequest)
            .eq('id', request.id)
            .is('is_deleted', false)
            .select()
            .single();
        const serviceData = service.data;
        if (service.error) {
            throw new base_error_1.BaseError(`Failed to update service: ${service.error.message}`);
        }
        const response = {
            id: serviceData.id,
            createdAt: new Date(serviceData.created_at),
            name: serviceData.name,
            price: serviceData.price,
            commissionRate: serviceData.commission_rate,
            description: serviceData.description,
            durationInMinutes: serviceData.duration_in_minutes,
        };
        return response;
    }
};
exports.UpdateServiceService = UpdateServiceService;
exports.UpdateServiceService = UpdateServiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SUPABASE_REQUEST_CLIENT')),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], UpdateServiceService);
//# sourceMappingURL=update-service.service.js.map