export class GetAllEmployeesRequest {
  page: number = 1;
  limit: number = 20;
  sortBy: string = 'created_at';
  sortDirection: 'asc' | 'desc' = 'desc';
  search?: string;
}
