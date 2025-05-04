import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
export declare class CookieService {
    private readonly configService;
    constructor(configService: ConfigService);
    setAuthCookie(res: Response, token: string): void;
    clearAuthCookie(res: Response): void;
}
