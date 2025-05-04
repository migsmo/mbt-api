import { GetServicesRequest } from './dto/get-services-request.dto';
import { GetServicesResponse } from './dto/get-services-response.dto';
import { GetServicesService } from './get-services.service';
export declare class GetServicesController {
    private readonly getServicesService;
    constructor(getServicesService: GetServicesService);
    getServices(query: GetServicesRequest): Promise<GetServicesResponse>;
}
