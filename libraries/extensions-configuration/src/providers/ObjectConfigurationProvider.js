"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ConfigurationProviderBase_1 = require("./ConfigurationProviderBase");
class ObjectConfigurationProvider extends ConfigurationProviderBase_1.default {
    /**
     * Construct instance of ConfigurationProvider
     * @param object
     */
    constructor(object) {
        super();
        this.#object = object || {};
    }
    /**
     * Source object with configuration.
     * @private
     */
    #object;
    /**
     * @inheritDoc
     */
    async load() {
        if (this.#object.constructor != Object) {
            throw new Error("Configuration object must be plain JS object.");
        }
        this.configuration = this.#object;
    }
}
exports.default = ObjectConfigurationProvider;
//# sourceMappingURL=ObjectConfigurationProvider.js.map