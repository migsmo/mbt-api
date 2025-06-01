import { AppointmentBillings } from 'src/entity/appointment-billings.entity';

export class UpdateAppointmentBillingsResponse {
  appointmentId: string;
  updatedBillings: AppointmentBillings[];
}
