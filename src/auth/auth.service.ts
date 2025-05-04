import { Inject, Injectable } from '@nestjs/common';
import { User } from '@supabase/supabase-js';
import { AuthProvider } from './abstracts/auth.provider.abstract';
import { SignInResponse } from './dto/sign-in-response.dto';
import { SignUpResponse } from './dto/sign-up-response.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthProvider) private readonly authProvider: AuthProvider,
  ) {}

  async signUp(email: string, password: string): Promise<SignUpResponse> {
    return this.authProvider.signUp(email, password);
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ response: SignInResponse; refreshToken: string }> {
    return await this.authProvider.signIn(email, password);
  }

  async validateToken(token: string): Promise<{ user: User }> {
    return await this.authProvider.validateToken(token);
  }

  async refreshToken(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authProvider.refreshSession(refreshToken);
  }
}
