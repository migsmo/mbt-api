import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';

export class EmployeeAppointments {
  appointmentId: string;
  appointmentDate: Date;
  customerName: string;
  services: string[];
  commission: number;
}
export class GetEmployeeAppointmentsResponse {
  data: {
    employeeId: string;
    appointments: EmployeeAppointments[];
  };
  meta: PaginationMeta;
}
