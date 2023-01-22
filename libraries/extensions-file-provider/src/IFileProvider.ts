import { IFileInfo } from "./IFileInfo";

export interface IFileProvider
{
	/**
	 * Get information about file at the given path.
	 * @param path
	 */
	getFileInfo(path: string): Promise<IFileInfo>;

	/**
	 * Get information about file at the given path.
	 * @param path
	 */
	getFileInfoSync(path: string): IFileInfo;
}