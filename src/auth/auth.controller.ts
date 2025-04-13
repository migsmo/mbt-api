import { Body, Controller, Post, Req, Res, UsePipes } from '@nestjs/common';
import { Request, Response } from 'express';
import { JoiValidationPipe } from 'src/commons/pipes/joi-validation.pipe';
import { CookieService } from 'src/commons/services/cookie.service';
import { routes } from 'src/config/routes';
import { AuthService } from './auth.service';

import { Public } from 'src/commons/decorators/public.decorator';
import { SignInResponse } from './dto/sign-in-response.dto';
import { SignUpResponse } from './dto/sign-up-response.dto';
import { signInSchema } from './schemas/auth.schema';

@Controller(routes.auth.root)
@UsePipes(new JoiValidationPipe(signInSchema))
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
  ) {}

  @Public()
  @Post(routes.auth.signup)
  async signUp(
    @Body() body: { email: string; password: string },
  ): Promise<SignUpResponse> {
    const response = await this.authService.signUp(body.email, body.password);
    return response;
  }

  @Public()
  @Post(routes.auth.signin)
  async signIn(
    @Body() body: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ): Promise<SignInResponse> {
    const { response, refreshToken } = await this.authService.signIn(
      body.email,
      body.password,
    );
    this.cookieService.setAuthCookie(res, refreshToken);
    return response;
  }

  @Public()
  @Post(routes.auth.refresh)
  async refreshToken(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refreshToken: string =
      (request.cookies as Record<string, string>)['refresh_token'] || '';

    if (!refreshToken) {
      response.status(401).send('Unauthorized');
      return;
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refreshToken(refreshToken);
    this.cookieService.setAuthCookie(response, newRefreshToken);
    response.json({ accessToken });
  }
}
