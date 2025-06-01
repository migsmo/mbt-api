export class AppointmentBillings {
  id: string;
  appointment_id: string;
  date_paid: Date;
  payment_type: string;
  amount: number;
  is_deleted: boolean;
}
