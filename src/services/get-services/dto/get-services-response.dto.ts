import { PaginationMeta } from 'src/commons/dto/pagination-meta.dto';
import { GetServiceResponse } from 'src/services/get-service/dto/get-service-response.dto';

export class GetServicesResponse {
  services: GetServiceResponse[];
  meta: PaginationMeta;
}
