"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorWrap_1 = require("@netleaf/common/src/errors/ErrorWrap");
const promises_1 = require("fs/promises");
const json5_1 = require("json5");
const ConfigurationProviderBase_1 = require("./ConfigurationProviderBase");
class JsonConfigurationProvider extends ConfigurationProviderBase_1.default {
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
            throw new Error(`Configuration from JSON file '${this.#configurationPath}' has not been loaded yet.`);
        }
        return super.get(key);
    }
    /**
     * @inheritDoc
     */
    async load() {
        try {
            const json = await promises_1.readFile(this.#configurationPath, { encoding: "utf-8" });
            this.configuration = json5_1.parse(json);
        }
        catch (ex) {
            throw new ErrorWrap_1.default(`Error thrown while loading configuration from JSON file '${this.#configurationPath}'.`, ex);
        }
    }
}
exports.default = JsonConfigurationProvider;
//# sourceMappingURL=JsonConfigurationProvider.js.map