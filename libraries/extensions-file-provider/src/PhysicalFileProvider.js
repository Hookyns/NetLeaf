"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhysicalFileProvider = void 0;
const path_1 = require("path");
const fs = require("fs/promises");
class PhysicalFileProvider {
    /**
     * Construct FileProvider
     * @param rootDirectory
     */
    constructor(rootDirectory) {
        this.#rootDirectory = rootDirectory;
    }
    #rootDirectory;
    /**
     * @inheritDoc
     */
    async getFileInfo(path) {
        path = path_1.resolve(this.#rootDirectory, path);
        try {
            const stats = await fs.lstat(path);
            return {
                isDirectory: stats.isDirectory(),
                name: path_1.basename(path),
                path: path,
                exists: true
            };
        }
        catch (ex) {
            console.log(ex);
            return {
                isDirectory: false,
                name: path_1.basename(path),
                path: path,
                exists: false
            };
        }
    }
}
exports.PhysicalFileProvider = PhysicalFileProvider;
//# sourceMappingURL=PhysicalFileProvider.js.map