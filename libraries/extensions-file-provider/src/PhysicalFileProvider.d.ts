import IFileInfo from "./IFileInfo";
import IFileProvider from "./IFileProvider";
export declare class PhysicalFileProvider implements IFileProvider {
    #private;
    /**
     * Construct FileProvider
     * @param rootDirectory
     */
    constructor(rootDirectory: string);
    /**
     * @inheritDoc
     */
    getFileInfo(path: string): Promise<IFileInfo>;
}
