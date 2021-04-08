"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorWrap_1 = require("@netleaf/common/src/errors/ErrorWrap");
const minimist = require("minimist");
const ConfigurationProviderBase_1 = require("./ConfigurationProviderBase");
class ConsoleConfigurationProvider extends ConfigurationProviderBase_1.default {
    /**
     * Construct instance of ConfigurationProvider
     * @param args
     */
    constructor(args) {
        super();
        this.#args = args;
    }
    /**
     * Args from command line.
     * @private
     */
    #args;
    /**
     * @inheritDoc
     */
    get(key) {
        if (this.configuration === undefined) {
            throw new Error(`Configuration from console arguments has not been loaded yet.`);
        }
        return super.get(key);
    }
    /**
     * @inheritDoc
     */
    async load() {
        try {
            this.configuration = minimist(this.#args);
        }
        catch (ex) {
            throw new ErrorWrap_1.default(`Error thrown while parsing configuration from console arguments.`, ex);
        }
    }
}
exports.default = ConsoleConfigurationProvider;
//# sourceMappingURL=ConsoleConfigurationProvider.js.map