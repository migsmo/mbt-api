import { Request, Response } from 'express';
import { CookieService } from 'src/commons/services/cookie.service';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/sign-in-response.dto';
import { SignUpResponse } from './dto/sign-up-response.dto';
export declare class AuthController {
    private readonly authService;
    private readonly cookieService;
    constructor(authService: AuthService, cookieService: CookieService);
    signUp(body: {
        email: string;
        password: string;
    }): Promise<SignUpResponse>;
    signIn(body: {
        email: string;
        password: string;
    }, res: Response): Promise<SignInResponse>;
    refreshToken(request: Request, response: Response): Promise<void>;
}
