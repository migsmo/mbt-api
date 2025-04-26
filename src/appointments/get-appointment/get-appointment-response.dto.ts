export class GetAppointmentResponse {
  id: string;
  createdAt: Date;
  dateTime: Date;
  additionalRemarks: string;
  selectedServices: string[];
  customerAssigned: string;
}
