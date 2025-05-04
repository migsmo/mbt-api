import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { fromZonedTime, toZonedTime } from 'date-fns-tz';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { BaseError } from 'src/errors/base-error';
import { GetAvailableDaySlotSResponse } from './dto/get-available-day-slots-response.dto';

@Injectable()
export class GetAvailableDaySlotSService {
  private readonly TIMEZONE = 'Asia/Manila';

  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}

  async getAvailableSlotsForDay(
    day: string,
  ): Promise<GetAvailableDaySlotSResponse> {
    // Convert incoming date to Manila time
    const requestedDayLocal = toZonedTime(new Date(day), this.TIMEZONE);
    requestedDayLocal.setHours(0, 0, 0, 0);

    if (isNaN(requestedDayLocal.getTime())) {
      throw new BaseError('Invalid day format.');
    }

    // Current day in Manila time
    const now = toZonedTime(new Date(), this.TIMEZONE);
    now.setHours(0, 0, 0, 0);

    // Max date = 3 months from now
    const maxDate = new Date(now);
    maxDate.setMonth(maxDate.getMonth() + 3);
    maxDate.setHours(0, 0, 0, 0);

    if (requestedDayLocal < now || requestedDayLocal > maxDate) {
      throw new BaseError('Date must be within the next 3 months.');
    }

    const timeSlots: string[] = [];

    for (let hour = 10; hour < 22; hour++) {
      for (const minute of [0, 30]) {
        const localSlot = new Date(requestedDayLocal);
        localSlot.setHours(hour, minute, 0, 0);

        // Convert Manila time to UTC for Supabase
        const utcSlot = fromZonedTime(localSlot, this.TIMEZONE);
        timeSlots.push(utcSlot.toISOString());
      }
    }

    const { data: appointments, error } = await this.supabase
      .from('appointments')
      .select('date_time')
      .gte('date_time', timeSlots[0])
      .lte('date_time', timeSlots[timeSlots.length - 1]);

    if (error) throw new Error(error.message);

    const countMap = new Map<string, number>();
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

    const response: GetAvailableDaySlotSResponse = {
      availableSlots: availableSlots,
    };

    return response;
  }
}
