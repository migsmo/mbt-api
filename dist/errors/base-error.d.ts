import { HttpException } from '@nestjs/common';
export declare class BaseError extends HttpException {
    readonly clientMessage: string;
    readonly internalMessage?: string | undefined;
    constructor(clientMessage: string, internalMessage?: string | undefined, statusCode?: number);
}
