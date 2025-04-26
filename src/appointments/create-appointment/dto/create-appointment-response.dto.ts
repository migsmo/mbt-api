export class CreateAppointmentResponse {
  appointmentId: string;
  dateTime: string;
  customerId: string;
  selectedServices: string[];
  additionalRemarks?: string;
  status: string; // e.g., "confirmed", "pending", "cancelled"
  createdAt: Date;
}
