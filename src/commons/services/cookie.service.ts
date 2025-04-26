import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';

@Injectable()
export class CookieService {
  constructor(private readonly configService: ConfigService) {}

  setAuthCookie(res: Response, token: string): void {
    const cookieOptions = {
      httpOnly: true,
      secure: false,
      sameSite: 'lax' as const,
      maxAge: 3600000,
    };

    res.cookie('refreshToken', token, cookieOptions);
  }

  clearAuthCookie(res: Response): void {
    res.clearCookie('refreshToken');
  }
}
