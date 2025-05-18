import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
export declare class EmployeeAppointments {
    appointmentId: string;
    appointmentDate: Date;
    customerName: string;
    services: string[];
    commission: number;
}
export declare class GetEmployeeAppointmentsResponse {
    data: {
        employeeId: string;
        appointments: EmployeeAppointments[];
    };
    meta: PaginationMeta;
}
