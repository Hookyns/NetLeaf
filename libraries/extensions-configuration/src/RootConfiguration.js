"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Configuration_1 = require("./Configuration");
class RootConfiguration extends Configuration_1.default {
    /**
     * Construct RootConfiguration.
     * @param providers
     */
    constructor(providers) {
        super(undefined, "");
        this.root = this;
        this.#providers = providers;
    }
    #providers;
    /**
     * @inheritDoc
     */
    get providers() {
        return this.#providers.slice();
    }
}
exports.default = RootConfiguration;
//# sourceMappingURL=RootConfiguration.js.map