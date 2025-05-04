"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseAuthProvider = void 0;
const common_1 = require("@nestjs/common");
const supabase_js_1 = require("@supabase/supabase-js");
const base_error_1 = require("../../errors/base-error");
const supabase_provider_1 = require("../providers/supabase.provider");
let SupabaseAuthProvider = class SupabaseAuthProvider {
    supabase;
    constructor(supabase) {
        this.supabase = supabase;
    }
    async signUp(email, password) {
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            throw new common_1.BadRequestException(error.message);
        }
        const { user } = data;
        if (!user) {
            throw new Error('Error retrieving user data');
        }
        if (!user.role) {
            throw new Error('Error retrieving user role');
        }
        if (!user.email) {
            throw new Error('Error retrieving user email');
        }
        const response = {
            accountId: user.id,
            role: user.role,
            email: user.email,
        };
        return response;
    }
    async signIn(email, password) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            throw new base_error_1.BaseError(error.message, error.message, common_1.HttpStatus.UNAUTHORIZED);
        }
        const { user, session } = data;
        if (!user) {
            throw new base_error_1.BaseError('We encountered an issue while logging you in. Please try again later.', 'Failed to retrieve user data');
        }
        if (!session) {
            throw new base_error_1.BaseError('We encountered an issue while logging you in. Please try again later.', 'Error retrieving session data');
        }
        if (!user.role) {
            throw new base_error_1.BaseError('We encountered an issue while logging you in. Please try again later.', 'Error retrieving user role');
        }
        if (!user.email) {
            throw new base_error_1.BaseError('We encountered an issue while logging you in. Please try again later.', 'Error retrieving user email');
        }
        const response = {
            accountId: user.id,
            role: user.role,
            email: user.email,
            accessToken: session.access_token,
        };
        return {
            response,
            refreshToken: session.refresh_token,
        };
    }
    async validateToken(token) {
        const { data, error } = await this.supabase.auth.getUser(token);
        if (error) {
            throw new base_error_1.BaseError('We encountered an issue while retrieving user data. Please try again later.', error.message);
        }
        return data;
    }
    async refreshSession(refreshToken) {
        const { data, error } = await this.supabase.auth.refreshSession({
            refresh_token: refreshToken,
        });
        if (error || data.session === null) {
            throw new base_error_1.BaseError('We encountered an issue while refreshing your session. Please try again later.', error?.message);
        }
        return {
            accessToken: data.session.access_token,
            refreshToken: data.session.refresh_token,
        };
    }
};
exports.SupabaseAuthProvider = SupabaseAuthProvider;
exports.SupabaseAuthProvider = SupabaseAuthProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(supabase_provider_1.SUPABASE_CLIENT)),
    __metadata("design:paramtypes", [supabase_js_1.SupabaseClient])
], SupabaseAuthProvider);
//# sourceMappingURL=supabase-auth.provider.js.map