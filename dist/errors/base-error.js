"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseError = void 0;
const common_1 = require("@nestjs/common");
class BaseError extends common_1.HttpException {
    clientMessage;
    internalMessage;
    constructor(clientMessage, internalMessage, statusCode = common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
        super(clientMessage, statusCode);
        this.clientMessage = clientMessage;
        this.internalMessage = internalMessage;
        this.internalMessage = internalMessage || clientMessage;
    }
}
exports.BaseError = BaseError;
//# sourceMappingURL=base-error.js.map