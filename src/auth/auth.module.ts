import { Module } from '@nestjs/common';
import { CookieService } from 'src/commons/services/cookie.service';
import { AuthProvider } from './abstracts/auth.provider.abstract';
import { SupabaseAuthProvider } from './auth-providers/supabase-auth.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseProvider } from './providers/supabase.provider';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    SupabaseProvider,
    CookieService,
    {
      provide: AuthProvider,
      useClass: SupabaseAuthProvider,
    },
  ],
})
export class AuthModule {}
