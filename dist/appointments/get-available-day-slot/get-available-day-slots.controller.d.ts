import { GetAvailableDaySlotSResponse } from './dto/get-available-day-slots-response.dto';
import { GetAvailableDaySlotSService } from './get-available-day-slots.service';
export declare class GetAvailableDaySlotsController {
    private readonly getAvailableDaySlotSService;
    constructor(getAvailableDaySlotSService: GetAvailableDaySlotSService);
    getAvailableSlotsByDay(day: string): Promise<GetAvailableDaySlotSResponse>;
}
