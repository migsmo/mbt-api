import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { SupabaseClient, User } from '@supabase/supabase-js';
import { BaseError } from 'src/errors/base-error';
import { AuthProvider } from '../abstracts/auth.provider.abstract';
import { SignInResponse } from '../dto/sign-in-response.dto';
import { SignUpResponse } from '../dto/sign-up-response.dto';
import { SUPABASE_CLIENT } from '../providers/supabase.provider';

@Injectable()
export class SupabaseAuthProvider implements AuthProvider {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async signUp(email: string, password: string): Promise<SignUpResponse> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      throw new BadRequestException(error.message);
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
  ): Promise<{ response: SignInResponse; refreshToken: string }> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new BaseError(
        error.message,
        error.message,
        HttpStatus.UNAUTHORIZED,
      );
    }

    const { user, session } = data;

    if (!user) {
      throw new BaseError(
        'We encountered an issue while logging you in. Please try again later.',
        'Failed to retrieve user data',
      );
    }

    if (!session) {
      throw new BaseError(
        'We encountered an issue while logging you in. Please try again later.',
        'Error retrieving session data',
      );
    }

    if (!user.role) {
      throw new BaseError(
        'We encountered an issue while logging you in. Please try again later.',
        'Error retrieving user role',
      );
    }

    if (!user.email) {
      throw new BaseError(
        'We encountered an issue while logging you in. Please try again later.',
        'Error retrieving user email',
      );
    }

    const response: SignInResponse = {
      accountId: user.id,
      role: user.role,
      email: user.email,
      accessToken: session.access_token,
    };

    return {
      response,
      refreshToken: session.refresh_token,
    };
  }

  async validateToken(token: string): Promise<{ user: User }> {
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error) {
      throw new BaseError(
        'We encountered an issue while retrieving user data. Please try again later.',
        error.message,
      );
    }

    return data;
  }

  async refreshSession(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { data, error } = await this.supabase.auth.refreshSession({
      refresh_token: refreshToken,
    });

    if (error || data.session === null) {
      throw new BaseError(
        'We encountered an issue while refreshing your session. Please try again later.',
        error?.message,
      );
    }

    return {
      accessToken: data.session.access_token,
      refreshToken: data.session.refresh_token,
    };
  }
}
