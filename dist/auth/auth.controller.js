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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const joi_validation_pipe_1 = require("../commons/pipes/joi-validation.pipe");
const cookie_service_1 = require("../commons/services/cookie.service");
const routes_1 = require("../config/routes");
const auth_service_1 = require("./auth.service");
const public_decorator_1 = require("../commons/decorators/public.decorator");
const auth_schema_1 = require("./schemas/auth.schema");
let AuthController = class AuthController {
    authService;
    cookieService;
    constructor(authService, cookieService) {
        this.authService = authService;
        this.cookieService = cookieService;
    }
    async signUp(body) {
        const response = await this.authService.signUp(body.email, body.password);
        return response;
    }
    async signIn(body, res) {
        const { response, refreshToken } = await this.authService.signIn(body.email, body.password);
        this.cookieService.setAuthCookie(res, refreshToken);
        return response;
    }
    async refreshToken(request, response) {
        const refreshToken = request.cookies['refreshToken'] || '';
        if (!refreshToken) {
            response.status(401).send('Unauthorized');
            return;
        }
        const { accessToken, refreshToken: newRefreshToken } = await this.authService.refreshToken(refreshToken);
        this.cookieService.setAuthCookie(response, newRefreshToken);
        response.json({ accessToken });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(routes_1.routes.auth.signup),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(routes_1.routes.auth.signin),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(routes_1.routes.auth.refresh),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refreshToken", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)(routes_1.routes.auth.root),
    (0, common_1.UsePipes)(new joi_validation_pipe_1.JoiValidationPipe(auth_schema_1.signInSchema)),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        cookie_service_1.CookieService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map