import { GetServiceService } from './get-service.service';
export declare class GetServiceController {
    private readonly getServiceService;
    constructor(getServiceService: GetServiceService);
    getServiceById(id: string): Promise<import("./dto/get-service-response.dto").GetServiceResponse>;
}
