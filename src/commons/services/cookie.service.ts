import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  setAuthCookie(res: Response, token: string): void {
    const cookieOptions = {
      httpOnly: true,
      secure: this.configService.get<boolean>('COOKIE_SECURE', true), // Default to true in production
      sameSite: this.configService.get<'lax' | 'strict' | 'none'>(
        'COOKIE_SAMESITE',
        'lax',
      ),
      maxAge: this.configService.get<number>('COOKIE_MAX_AGE', 3600000), // Default to 1 hour
    };

    res.cookie('refreshToken', token, cookieOptions);
  }

  clearAuthCookie(res: Response): void {
    res.clearCookie('refreshToken');
  }
}
