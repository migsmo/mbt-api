import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_REQUEST_CLIENT } from 'src/auth/providers/supabase-request.provider';
import { BaseError } from 'src/errors/base-error';
import { GetAvailableDaySlotSResponse } from './dto/get-available-day-slots-response.dto';

@Injectable()
export class GetAvailableDaySlotSService {
  constructor(
    @Inject(SUPABASE_REQUEST_CLIENT)
    private readonly supabase: SupabaseClient,
  ) {}
  async getAvailableSlotsForDay(
    day: string,
  ): Promise<GetAvailableDaySlotSResponse> {
    const requestedDay = new Date(day);
    requestedDay.setHours(0, 0, 0, 0);

    console.log('requestedDay', requestedDay);

    if (isNaN(requestedDay.getTime())) {
      throw new BaseError('Invalid day format.');
    }

    const now = new Date();
    now.setHours(0, 0, 0, 0);

    console.log('now', now);

    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    maxDate.setHours(0, 0, 0, 0);

    console.log('maxDate', maxDate);

    console.log(maxDate);

    if (requestedDay < now || requestedDay > maxDate) {
      throw new BaseError('Date must be within the next 3 months.');
    }

    const timeSlots: string[] = [];
    const dayStart = new Date(day);
    dayStart.setHours(10, 0, 0, 0);

    for (let hour = 10; hour < 22; hour++) {
      for (const minute of [0, 30]) {
        const slot = new Date(dayStart);
        slot.setHours(hour, minute, 0, 0);
        timeSlots.push(slot.toISOString());
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
