import { SignInResponse } from '../interfaces/sign-in-response.class';
import { SignUpResponse } from '../interfaces/sign-up-response.class';

export abstract class AuthProvider {
  abstract signUp(email: string, password: string): Promise<SignUpResponse>;
  abstract signIn(
    email: string,
    password: string,
  ): Promise<{ response: SignInResponse; accessToken: string }>;
}
