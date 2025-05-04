export declare class GlobalErrorLoggerService {
    logError(error: {
        timestamp: string;
        path: string;
        method: string;
        status: number;
        message: any;
        stack?: string;
    }): void;
    logInfo(message: string): void;
    logWarn(message: string): void;
}
