import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  setAuthCookie(res: Response, token: string): void {
    const cookieOptions = {
      httpOnly: true,
      secure: this.configService.get('NODE_ENV') === 'production',
      sameSite: 'strict' as const,
      maxAge: 3600000, // default: 1 hour
    };

    res.cookie('access_token', token, cookieOptions);
  }

  clearAuthCookie(res: Response): void {
    res.clearCookie('access_token');
  }
}
