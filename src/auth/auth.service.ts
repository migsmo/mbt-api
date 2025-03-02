import { Inject, Injectable } from '@nestjs/common';
import { AuthProvider } from './abstracts/auth.provider.abstract';
import { SignInResponse } from './interfaces/sign-in-response.class';
import { SignUpResponse } from './interfaces/sign-up-response.class';

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
  ): Promise<{ response: SignInResponse; accessToken: string }> {
    return this.authProvider.signIn(email, password);
  }
}
