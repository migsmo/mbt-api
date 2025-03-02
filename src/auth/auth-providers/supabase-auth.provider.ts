import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CookieService } from 'src/commons/services/cookie.service';
import { AuthProvider } from '../abstracts/auth.provider.abstract';
import { SignInResponse } from '../interfaces/sign-in-response.class';
import { SignUpResponse } from '../interfaces/sign-up-response.class';
import { SUPABASE_CLIENT } from '../providers/supabase.provider';

@Injectable()
export class SupabaseAuthProvider implements AuthProvider {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
    private readonly cookieService: CookieService,
  ) {}

  async signUp(email: string, password: string): Promise<SignUpResponse> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new Error('Error during signup:' + error.message);
    }

    const { user } = data;

    if (!user) {
      throw new Error('Error retrieving user data');
    }

    if (!user.role) {
      throw new Error('Error retrieving user role');
    }

    if (!user.email) {
      throw new Error('Error retrieving user email');
    }

    const response: SignUpResponse = {
      accountId: user.id,
      role: user.role,
      email: user.email,
    };

    return response;
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<{ response: SignInResponse; accessToken: string }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error('Error during signup:' + error.message);
    }

    const { user, session } = data;

    if (!user) {
      throw new Error('Error retrieving user data');
    }

    if (!session) {
      throw new Error('Error retrieving session data');
    }

    if (!user.role) {
      throw new Error('Error retrieving user role');
    }

    if (!user.email) {
      throw new Error('Error retrieving user email');
    }

    const response: SignInResponse = {
      accountId: user.id,
      role: user.role,
      email: user.email,
    };

    return { response, accessToken: session.access_token };
  }
}
