import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SupabaseInitializationError } from 'src/errors/auth.error';

export const SUPABASE_CLIENT = 'SUPABASE_CLIENT';

export const SupabaseProvider: Provider = {
  provide: SUPABASE_CLIENT,
  useFactory: (configService: ConfigService): SupabaseClient => {
    const supabaseUrl = configService.get<string>('supabaseUrl');
    const supabaseKey = configService.get<string>('supabaseKey');

    if (supabaseUrl === undefined || supabaseKey === undefined) {
      throw new SupabaseInitializationError('Check configuration settings.');
    }

    let client: SupabaseClient;

    try {
      client = createClient(supabaseUrl, supabaseKey);
    } catch (error: any) {
      throw new SupabaseInitializationError(
        error instanceof Error ? error.message : '',
      );
    }

    return client;
  },
  inject: [ConfigService],
};
