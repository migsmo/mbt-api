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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const auth_provider_abstract_1 = require("./abstracts/auth.provider.abstract");
let AuthService = class AuthService {
    authProvider;
    constructor(authProvider) {
        this.authProvider = authProvider;
    }
    async signUp(email, password) {
        return this.authProvider.signUp(email, password);
    }
    async signIn(email, password) {
        return await this.authProvider.signIn(email, password);
    }
    async validateToken(token) {
        return await this.authProvider.validateToken(token);
    }
    async refreshToken(refreshToken) {
        return await this.authProvider.refreshSession(refreshToken);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(auth_provider_abstract_1.AuthProvider)),
    __metadata("design:paramtypes", [auth_provider_abstract_1.AuthProvider])
], AuthService);
//# sourceMappingURL=auth.service.js.map