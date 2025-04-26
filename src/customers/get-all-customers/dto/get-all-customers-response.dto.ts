import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
import { GetCustomerResponse } from 'src/customers/get-customer/dto/get-customer-response.dto';

export class GetAllCustomersResponse {
  customers: GetCustomerResponse[];
  meta: PaginationMeta;
}
