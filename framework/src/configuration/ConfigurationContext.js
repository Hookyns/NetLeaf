"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ConfigurationContext {
    /**
     * Construct ConfigurationContext
     * @param environment
     */
    constructor(environment) {
        this.#properties = {};
        this.#environment = Object.freeze(environment);
    }
    #properties;
    #environment;
    /**
     * Properties shared between components during application initialization.
     */
    get properties() {
        return this.#properties;
    }
    /**
     * Get instance of {@link IHostEnvironment}
     */
    get environment() {
        return this.#environment;
    }
}
exports.default = ConfigurationContext;
//# sourceMappingURL=ConfigurationContext.js.map