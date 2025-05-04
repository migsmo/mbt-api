import { SupabaseClient } from '@supabase/supabase-js';
import { GetAvailableDaySlotSResponse } from './dto/get-available-day-slots-response.dto';
export declare class GetAvailableDaySlotSService {
    private readonly supabase;
    private readonly TIMEZONE;
    constructor(supabase: SupabaseClient);
    getAvailableSlotsForDay(day: string): Promise<GetAvailableDaySlotSResponse>;
}
