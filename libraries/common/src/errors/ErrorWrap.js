"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
const EndOfLineRegex = /\r?\n/g;
/**
 * Error class for wrapping caught errors with additional details.
 */
class ErrorWrap extends Error {
    /**
     * Construct error.
     * @param message
     * @param innerError
     */
    constructor(message, innerError) {
        super(message);
        if (!innerError) {
            throw new Error("Argument 'innerError' cannot be falsy.");
        }
        this.#innerError = innerError;
        if (!this.stack) {
            Error.captureStackTrace(this, this.constructor);
        }
        const innerName = innerError.constructor.name ? " " + innerError.constructor.name : "";
        this.stack = this.stack
            + os_1.EOL
            + ErrorWrap.stackWithMessage(innerError, `InnerError${innerName}: ${innerError.message}`);
    }
    /**
     * Inner error backing field.
     * @private
     */
    #innerError;
    // noinspection JSUnusedGlobalSymbols
    /**
     * Get inner Error object.
     */
    get innerError() {
        return this.#innerError;
    }
    /**
     * Get modified stack trace of error.
     * @param error
     * @param newMessage
     * @private
     */
    static stackWithMessage(error, newMessage) {
        const stack = error.stack || "";
        const match = error.message.match(EndOfLineRegex);
        const lines = match ? match.length + 1 : 1;
        return newMessage + os_1.EOL
            + stack.split(EndOfLineRegex).slice(lines).join(os_1.EOL);
    }
}
exports.default = ErrorWrap;
//# sourceMappingURL=ErrorWrap.js.map