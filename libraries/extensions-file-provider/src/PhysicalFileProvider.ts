import * as fs               from "fs/promises";
import { basename, resolve } from "path";
import IFileInfo             from "./IFileInfo";
import IFileProvider         from "./IFileProvider";

export default class PhysicalFileProvider implements IFileProvider
{
	readonly #rootDirectory: string;

	/**
	 * Construct FileProvider
	 * @param rootDirectory
	 */
	constructor(rootDirectory: string)
	{
		this.#rootDirectory = rootDirectory;
	}

	/**
	 * @inheritDoc
	 */
	async getFileInfo(path: string): Promise<IFileInfo>
	{
		path = resolve(this.#rootDirectory, path);

		try
		{
			const stats = await fs.lstat(path);

			return {
				isDirectory: stats.isDirectory(),
				name: basename(path),
				path: path,
				exists: true
			};
		}
		catch (ex)
		{
			return {
				isDirectory: false,
				name: basename(path),
				path: path,
				exists: false
			};
		}
	}
}