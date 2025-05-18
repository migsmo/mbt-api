import { SupabaseClient, User } from '@supabase/supabase-js';
import { AuthProvider } from '../abstracts/auth.provider.abstract';
import { SignInResponse } from '../dto/sign-in-response.dto';
import { SignUpResponse } from '../dto/sign-up-response.dto';
export declare class SupabaseAuthProvider implements AuthProvider {
    private readonly supabase;
    constructor(supabase: SupabaseClient);
    signUp(email: string, password: string): Promise<SignUpResponse>;
    signIn(email: string, password: string): Promise<{
        response: SignInResponse;
        refreshToken: string;
    }>;
    validateToken(token: string): Promise<{
        user: User;
    }>;
    refreshSession(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
    }>;
}
