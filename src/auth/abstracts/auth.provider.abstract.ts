import { User } from '@supabase/supabase-js';
import { SignInResponse } from '../dto/sign-in-response.dto';
import { SignUpResponse } from '../dto/sign-up-response.dto';

export abstract class AuthProvider {
  abstract signUp(email: string, password: string): Promise<SignUpResponse>;
  abstract signIn(
    email: string,
    password: string,
  ): Promise<{ response: SignInResponse; refreshToken: string }>;
  abstract validateToken(token: string): Promise<{ user: User }>;
  abstract refreshSession(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }>;
}
