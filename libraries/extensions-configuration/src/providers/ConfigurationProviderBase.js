"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathHelper_1 = require("../PathHelper");
class ConfigurationProviderBase {
    /**
     * @inheritDoc
     */
    get(key) {
        if (!key) {
            throw new Error("Argument 'key' cannot be falsy.");
        }
        if (!this.configuration) {
            return undefined;
        }
        const parts = key.split(PathHelper_1.KeySplitChar);
        let prop = parts[0];
        let obj = this.configuration[prop];
        // let path = prop;
        let partIndex = 0;
        while (partIndex < parts.length - 1 && obj != undefined) {
            partIndex++;
            prop = parts[partIndex];
            obj = obj[prop];
            // path += KeySplitChar + prop;
        }
        return obj;
    }
}
exports.default = ConfigurationProviderBase;
//# sourceMappingURL=ConfigurationProviderBase.js.map