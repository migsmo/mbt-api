import { User } from '@supabase/supabase-js';
import { AuthProvider } from './abstracts/auth.provider.abstract';
import { SignInResponse } from './dto/sign-in-response.dto';
import { SignUpResponse } from './dto/sign-up-response.dto';
export declare class AuthService {
    private readonly authProvider;
    constructor(authProvider: AuthProvider);
    signUp(email: string, password: string): Promise<SignUpResponse>;
    signIn(email: string, password: string): Promise<{
        response: SignInResponse;
        refreshToken: string;
    }>;
    validateToken(token: string): Promise<{
        user: User;
    }>;
    refreshToken(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
