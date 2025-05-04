import { Provider, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Request } from 'express';
import { SupabaseInitializationError } from 'src/errors/auth.error';

export const SUPABASE_REQUEST_CLIENT = 'SUPABASE_REQUEST_CLIENT';

export const SupabaseRequestProvider: Provider = {
  provide: SUPABASE_REQUEST_CLIENT,
  scope: Scope.REQUEST,
  useFactory: async (
    configService: ConfigService,
    request: Request,
  ): Promise<SupabaseClient> => {
    const supabaseUrl = configService.get<string>('NEXT_PUBLIC_SUPABASE_URL');
    const supabaseKey = configService.get<string>('SUPABASE_ANON_KEY');

    if (supabaseUrl === undefined || supabaseKey === undefined) {
      throw new SupabaseInitializationError('Check configuration settings.');
    }

    let client: SupabaseClient;

    try {
      client = createClient(supabaseUrl, supabaseKey);

      const authHeader = request.headers.authorization;
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const accessToken = authHeader.split(' ')[1];

        await client.auth.setSession({
          access_token: accessToken,
          refresh_token: (request.cookies['refreshToken'] as string) || '',
        });
      }
    } catch (error: any) {
      throw new SupabaseInitializationError(
        error instanceof Error ? error.message : '',
      );
    }

    return client;
  },
  inject: [ConfigService, REQUEST],
};
