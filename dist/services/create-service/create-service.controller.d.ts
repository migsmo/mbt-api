import { CreateServiceService } from './create-service.service';
import { CreateServiceRequest } from './dto/create-service-request.dto';
export declare class CreateServiceController {
    private readonly createServiceService;
    constructor(createServiceService: CreateServiceService);
    create(request: CreateServiceRequest): Promise<import("./dto/create-service-response.dto").CreateServiceResponse>;
}
