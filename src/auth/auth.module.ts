import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { CookieService } from 'src/commons/services/cookie.service';
import { AuthProvider } from './abstracts/auth.provider.abstract';
import { SupabaseAuthProvider } from './auth-providers/supabase-auth.provider';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/supabase-auth.guard';
import { SupabaseRequestProvider } from './providers/supabase-request.provider';
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
    SupabaseRequestProvider,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
