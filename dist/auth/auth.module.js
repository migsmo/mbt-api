"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const cookie_service_1 = require("../commons/services/cookie.service");
const auth_provider_abstract_1 = require("./abstracts/auth.provider.abstract");
const supabase_auth_provider_1 = require("./auth-providers/supabase-auth.provider");
const auth_controller_1 = require("./auth.controller");
const auth_service_1 = require("./auth.service");
const supabase_auth_guard_1 = require("./guards/supabase-auth.guard");
const supabase_request_provider_1 = require("./providers/supabase-request.provider");
const supabase_provider_1 = require("./providers/supabase.provider");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            supabase_provider_1.SupabaseProvider,
            cookie_service_1.CookieService,
            {
                provide: auth_provider_abstract_1.AuthProvider,
                useClass: supabase_auth_provider_1.SupabaseAuthProvider,
            },
            supabase_request_provider_1.SupabaseRequestProvider,
            {
                provide: core_1.APP_GUARD,
                useClass: supabase_auth_guard_1.AuthGuard,
            },
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map