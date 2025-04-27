export class GetAllAppointmentBillingsResponse {
  appointmentBillings: {
    appointmentBillingId: string;
    appointmentId: string;
    datePaid: Date;
    paymentType: string;
    amount: number;
  }[];
}
