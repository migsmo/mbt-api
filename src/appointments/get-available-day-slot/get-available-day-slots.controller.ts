import { Controller, Get, Param } from '@nestjs/common';
import { routes } from 'src/config/routes';
import { GetAvailableDaySlotSResponse } from './dto/get-available-day-slots-response.dto';
import { GetAvailableDaySlotSService } from './get-available-day-slots.service';

@Controller(routes.appointments.root)
export class GetAvailableDaySlotsController {
  constructor(
    private readonly getAvailableDaySlotSService: GetAvailableDaySlotSService,
  ) {}

  @Get(routes.appointments.getAvailableSlotsByDay)
  async getAvailableSlotsByDay(
    @Param('day') day: string,
  ): Promise<GetAvailableDaySlotSResponse> {
    return await this.getAvailableDaySlotSService.getAvailableSlotsForDay(day);
  }
}
