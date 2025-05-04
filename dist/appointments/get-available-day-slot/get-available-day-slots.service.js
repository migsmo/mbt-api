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
exports.GetAvailableDaySlotSService = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const date_fns_tz_1 = require("date-fns-tz");
const supabase_request_provider_1 = require("../../auth/providers/supabase-request.provider");
const base_error_1 = require("../../errors/base-error");
let GetAvailableDaySlotSService = class GetAvailableDaySlotSService {
    supabase;
    TIMEZONE = 'Asia/Manila';
    constructor(supabase) {
        this.supabase = supabase;
    }
    async getAvailableSlotsForDay(day) {
        const requestedDayLocal = (0, date_fns_tz_1.toZonedTime)(new Date(day), this.TIMEZONE);
        requestedDayLocal.setHours(0, 0, 0, 0);
        if (isNaN(requestedDayLocal.getTime())) {
            throw new base_error_1.BaseError('Invalid day format.');
        }
        const now = (0, date_fns_tz_1.toZonedTime)(new Date(), this.TIMEZONE);
        now.setHours(0, 0, 0, 0);
        const maxDate = new Date(now);
        maxDate.setMonth(maxDate.getMonth() + 3);
        maxDate.setHours(0, 0, 0, 0);
        if (requestedDayLocal < now || requestedDayLocal > maxDate) {
            throw new base_error_1.BaseError('Date must be within the next 3 months.');
        }
        const timeSlots = [];
        for (let hour = 10; hour < 22; hour++) {
            for (const minute of [0, 30]) {
                const localSlot = new Date(requestedDayLocal);
                localSlot.setHours(hour, minute, 0, 0);
                const utcSlot = (0, date_fns_tz_1.fromZonedTime)(localSlot, this.TIMEZONE);
                timeSlots.push(utcSlot.toISOString());
            }
        }
        const { data: appointments, error } = await this.supabase
            .from('appointments')
            .select('date_time')
            .gte('date_time', timeSlots[0])
            .lte('date_time', timeSlots[timeSlots.length - 1]);
        if (error)
            throw new Error(error.message);
        const countMap = new Map();
        for (const appointment of appointments) {
            const time = new Date(appointment.date_time).toISOString();
            countMap.set(time, (countMap.get(time) || 0) + 1);
        }
        const availableSlots = timeSlots
            .map((slot) => ({
            dateTime: slot,
            availableSlots: 4 - (countMap.get(slot) || 0),
        }))
            .filter((slot) => slot.availableSlots > 0);
        const response = {
            availableSlots: availableSlots,
        };
        return response;
    }
};
exports.GetAvailableDaySlotSService = GetAvailableDaySlotSService;
exports.GetAvailableDaySlotSService = GetAvailableDaySlotSService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_request_provider_1.SUPABASE_REQUEST_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], GetAvailableDaySlotSService);
//# sourceMappingURL=get-available-day-slots.service.js.map