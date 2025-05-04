"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseRequestProvider = exports.SUPABASE_REQUEST_CLIENT = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const supabase_js_1 = require("@supabase/supabase-js");
const auth_error_1 = require("../../errors/auth.error");
exports.SUPABASE_REQUEST_CLIENT = 'SUPABASE_REQUEST_CLIENT';
exports.SupabaseRequestProvider = {
    provide: exports.SUPABASE_REQUEST_CLIENT,
    scope: common_1.Scope.REQUEST,
    useFactory: async (configService, request) => {
        const supabaseUrl = configService.get('NEXT_PUBLIC_SUPABASE_URL');
        const supabaseKey = configService.get('SUPABASE_ANON_KEY');
        if (supabaseUrl === undefined || supabaseKey === undefined) {
            throw new auth_error_1.SupabaseInitializationError('Check configuration settings.');
        }
        let client;
        try {
            client = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
            const authHeader = request.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                const accessToken = authHeader.split(' ')[1];
                await client.auth.setSession({
                    access_token: accessToken,
                    refresh_token: request.cookies['refreshToken'] || '',
                });
            }
        }
        catch (error) {
            throw new auth_error_1.SupabaseInitializationError(error instanceof Error ? error.message : '');
        }
        return client;
    },
    inject: [config_1.ConfigService, core_1.REQUEST],
};
//# sourceMappingURL=supabase-request.provider.js.map