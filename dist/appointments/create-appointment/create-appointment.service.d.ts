import { SupabaseClient } from '@supabase/supabase-js';
import { Service } from 'src/entity/service.entity';
import { CreateAppointmentRequest } from './dto/create-appointment-request.dto';
import { CreateAppointmentResponse } from './dto/create-appointment-response.dto';
export declare class CreateAppointmentService {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    createAppointment(request: CreateAppointmentRequest): Promise<CreateAppointmentResponse>;
    checkServiceIsReal(serviceId: string): Promise<Service>;
}
