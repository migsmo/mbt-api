import { DeleteServiceService } from './delete-service.service';
export declare class DeleteServiceController {
    private readonly deleteServiceService;
    constructor(deleteServiceService: DeleteServiceService);
    deleteService(id: string): Promise<import("./dto/delete-service-response.dto").DeleteServiceResponse>;
}
