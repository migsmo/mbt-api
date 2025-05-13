"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupabaseInitializationError = void 0;
const base_error_1 = require("./base-error");
class SupabaseInitializationError extends base_error_1.BaseError {
    constructor(error) {
        super('Initialization error' + error);
    }
}
exports.SupabaseInitializationError = SupabaseInitializationError;
//# sourceMappingURL=auth.error.js.map