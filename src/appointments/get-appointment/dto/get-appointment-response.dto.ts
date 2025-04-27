export class GetAppointmentResponse {
  id: string;
  createdAt: Date;
  dateTime: Date;
  additionalRemarks: string;
  selectedServices: {
    serviceId: string;
    staffIds: string[];
  }[];
  customerAssigned: string;
}
