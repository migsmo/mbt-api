import { GetAppointmentResponse } from 'src/appointments/get-appointment/dto/get-appointment-response.dto';
import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
export declare class GetAllAppointmentsByEmployeeResponse {
    employeeId: string;
    appointments: GetAppointmentResponse[];
    meta: PaginationMeta;
}
