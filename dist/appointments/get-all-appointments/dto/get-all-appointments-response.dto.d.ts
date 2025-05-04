import { GetAppointmentResponse } from 'src/appointments/get-appointment/dto/get-appointment-response.dto';
export interface GetAllAppointmentsResponse {
    appointments: GetAppointmentResponse[];
    appointmentCount: number;
}
