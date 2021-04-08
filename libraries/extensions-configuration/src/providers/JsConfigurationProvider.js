"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorWrap_1 = require("@netleaf/common/src/errors/ErrorWrap");
const ConfigurationProviderBase_1 = require("./ConfigurationProviderBase");
class JsConfigurationProvider extends ConfigurationProviderBase_1.default {
    /**
     * Construct instance of ConfigurationProvider
     * @param configurationPath
     */
    constructor(configurationPath) {
        super();
        this.#configurationPath = configurationPath;
    }
    /**
     * Path to configuration file
     * @private
     */
    #configurationPath;
    /**
     * @inheritDoc
     */
    get(key) {
        if (this.configuration === undefined) {
            throw new Error(`Configuration from JS file '${this.#configurationPath}' has not been loaded yet.`);
        }
        return super.get(key);
    }
    /**
     * @inheritDoc
     */
    async load() {
        let result;
        try {
            result = await Promise.resolve().then(() => require(this.#configurationPath));
        }
        catch (ex) {
            throw new ErrorWrap_1.default(`Error thrown while loading configuration from JS file '${this.#configurationPath}'.`, ex);
        }
        if (result.hasOwnProperty("default")) {
            result = result.default;
        }
        if (result instanceof Promise) {
            try {
                result = await result;
            }
            catch (ex) {
                throw new ErrorWrap_1.default(`Promise returned from JS configuration file '${this.#configurationPath}' has been rejected.`, ex);
            }
        }
        if (result.constructor == Object) {
            this.configuration = result;
        }
        else {
            throw new Error(`Unable to get configuration from JS file '${this.#configurationPath}'. Returned value is not plain JS object.`);
        }
    }
}
exports.default = JsConfigurationProvider;
//# sourceMappingURL=JsConfigurationProvider.js.map