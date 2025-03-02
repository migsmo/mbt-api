import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CookieService } from 'src/commons/services/cookie.service';
import { AuthService } from './auth.service';
import { SignInResponse } from './interfaces/sign-in-response.class';
import { SignUpResponse } from './interfaces/sign-up-response.class';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Post('signup')
  async signUp(
    @Body() body: { email: string; password: string },
  ): Promise<SignUpResponse> {
    const response = await this.authService.signUp(body.email, body.password);
    return response;
  }

  @Post('signin')
  async signIn(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInResponse> {
    const { response, accessToken } = await this.authService.signIn(
      body.email,
      body.password,
    );
    this.cookieService.setAuthCookie(res, accessToken);
    return response;
  }
}
