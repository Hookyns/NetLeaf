import IFileInfo from "./IFileInfo";
export default interface IFileProvider {
    /**
     * Get information about file at the given path.
     * @param path
     */
    getFileInfo(path: string): Promise<IFileInfo>;
}
