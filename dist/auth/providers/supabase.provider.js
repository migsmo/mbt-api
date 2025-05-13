"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseProvider = exports.SUPABASE_CLIENT = void 0;
const config_1 = require("@nestjs/config");
const supabase_js_1 = require("@supabase/supabase-js");
const auth_error_1 = require("../../errors/auth.error");
exports.SUPABASE_CLIENT = 'SUPABASE_CLIENT';
exports.SupabaseProvider = {
    provide: exports.SUPABASE_CLIENT,
    useFactory: (configService) => {
        const supabaseUrl = configService.get('NEXT_PUBLIC_SUPABASE_URL');
        const supabaseKey = configService.get('SUPABASE_ANON_KEY');
        if (supabaseUrl === undefined || supabaseKey === undefined) {
            throw new auth_error_1.SupabaseInitializationError('Check configuration settings.');
        }
        let client;
        try {
            client = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
        }
        catch (error) {
            throw new auth_error_1.SupabaseInitializationError(error instanceof Error ? error.message : '');
        }
        return client;
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=supabase.provider.js.map