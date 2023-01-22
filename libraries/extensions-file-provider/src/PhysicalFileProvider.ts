import { lstat }         from "fs/promises";
import { lstatSync }     from "fs";
import {
	basename,
	resolve
}                        from "path";
import { IFileInfo }     from "./IFileInfo";
import { IFileProvider } from "./IFileProvider";

export class PhysicalFileProvider implements IFileProvider
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
			const stats = await lstat(path);

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

	/**
	 * @inheritDoc
	 */
	getFileInfoSync(path: string): IFileInfo
	{
		path = resolve(this.#rootDirectory, path);

		try
		{
			const stats = lstatSync(path);

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