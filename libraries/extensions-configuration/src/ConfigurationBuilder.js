"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorWrap_1 = require("@netleaf/common/src/errors/ErrorWrap");
const ConsoleConfigurationProvider_1 = require("./providers/ConsoleConfigurationProvider");
const JsConfigurationProvider_1 = require("./providers/JsConfigurationProvider");
const JsonConfigurationProvider_1 = require("./providers/JsonConfigurationProvider");
const ObjectConfigurationProvider_1 = require("./providers/ObjectConfigurationProvider");
const RootConfiguration_1 = require("./RootConfiguration");
class ConfigurationBuilder {
    constructor() {
        /**
         * Collection of providers
         * @private
         */
        this.#providers = [];
    }
    /**
     * Collection of providers
     * @private
     */
    #providers;
    /**
     * @inheritDoc
     */
    addConsole() {
        this.#providers.push(new ConsoleConfigurationProvider_1.default(process.argv.slice(2)));
        return this;
    }
    /**
     * @inheritDoc
     */
    addEnvironmentVariables(prefix) {
        this.#providers.push(new ObjectConfigurationProvider_1.default(process.env));
        return this;
    }
    /**
     * @inheritDoc
     */
    addJsFile(configPath) {
        this.#providers.push(new JsConfigurationProvider_1.default(configPath));
        return this;
    }
    /**
     * @inheritDoc
     */
    addJsonFile(configPath) {
        this.#providers.push(new JsonConfigurationProvider_1.default(configPath));
        return this;
    }
    /**
     * @inheritDoc
     */
    addObject(object) {
        this.#providers.push(new ObjectConfigurationProvider_1.default(object));
        return this;
    }
    /**
     * @inheritDoc
     */
    async build() {
        try {
            // Load configurations of all providers
            await Promise.all(this.#providers.map(provider => provider.load()));
            // Create and return root configuration
            return new RootConfiguration_1.default(this.#providers);
        }
        catch (ex) {
            throw new ErrorWrap_1.default("Error thrown while loading configurations of registered configuration providers.", ex);
        }
    }
}
exports.default = ConfigurationBuilder;
//# sourceMappingURL=ConfigurationBuilder.js.map