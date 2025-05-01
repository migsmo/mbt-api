export class CreateAppointmentBillingRequest {
  appointmentId: string;
  datePaid: Date;
  paymentType: string;
  amount: number;
}
