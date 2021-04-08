"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.combine = exports.KeySplitChar = void 0;
exports.KeySplitChar = ".";
/**
 * Combine path with key
 * @param path
 * @param key
 */
function combine(path, key) {
    if (!path) {
        return key;
    }
    if (!key) {
        return path;
    }
    return path + exports.KeySplitChar + key;
}
exports.combine = combine;
//# sourceMappingURL=PathHelper.js.map