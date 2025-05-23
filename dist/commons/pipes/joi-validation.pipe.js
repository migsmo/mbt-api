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
Object.defineProperty(exports, "__esModule", { value: true });
exports.JoiValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const base_error_1 = require("../../errors/base-error");
let JoiValidationPipe = class JoiValidationPipe {
    schema;
    constructor(schema) {
        this.schema = schema;
    }
    transform(value) {
        const { error } = this.schema.validate(value, { abortEarly: false });
        if (error) {
            const errorMessage = error.details
                .map((detail) => detail.message)
                .join(', ');
            throw new base_error_1.BaseError(errorMessage, errorMessage, common_1.HttpStatus.BAD_REQUEST);
        }
        return value;
    }
};
exports.JoiValidationPipe = JoiValidationPipe;
exports.JoiValidationPipe = JoiValidationPipe = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object])
], JoiValidationPipe);
//# sourceMappingURL=joi-validation.pipe.js.map