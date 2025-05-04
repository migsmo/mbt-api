import { UpdateServiceRequest } from './dto/update-service-request.dto';
import { UpdateServiceResponse } from './dto/update-service-response.dto';
import { UpdateServiceService } from './update-service.service';
export declare class UpdateServiceController {
    private readonly updateServiceService;
    constructor(updateServiceService: UpdateServiceService);
    updateService(request: UpdateServiceRequest): Promise<UpdateServiceResponse>;
}
