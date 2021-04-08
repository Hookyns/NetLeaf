"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PathHelper = require("./PathHelper");
class Configuration {
    /**
     * Construct Configuration.
     * @param root RootConfiguration
     * @param path Path of this configuration from the root
     */
    constructor(root, path) {
        this.#root = root;
        this.#path = path;
    }
    #path;
    #root;
    /**
     * Set root configuration
     * @param root
     * @internal
     */
    set root(root) {
        this.#root = root;
    }
    /**
     * @inheritDoc
     */
    get path() {
        return this.#path;
    }
    /**
     * @inheritDoc
     */
    get value() {
        return this.get("");
    }
    /**
     * @inheritDoc
     */
    get(key) {
        if (!this.#root) {
            throw new Error(`RootConfiguration has not beet set to this Configuration with path ${this.#path}.`);
        }
        return this.#root.get(PathHelper.combine(this.#path, key));
    }
    /**
     * @inheritDoc
     */
    getSection(sectionName) {
        if (!this.#root) {
            throw new Error(`RootConfiguration has not beet set to this Configuration with path ${this.#path}.`);
        }
        return new Configuration(this.#root, PathHelper.combine(this.#path, sectionName));
    }
}
exports.default = Configuration;
//# sourceMappingURL=Configuration.js.map