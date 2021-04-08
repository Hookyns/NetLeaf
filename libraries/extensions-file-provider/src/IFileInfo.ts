export default interface IFileInfo
{
	/**
	 * Physical path to the file or directory.
	 */
	readonly path: string;

	/**
	 * Name of the file or directory.
	 */
	readonly name: string;

	/**
	 * True if file exists in file system.
	 */
	readonly exists: boolean;

	/**
	 * True if the file is not file but directory.
	 */
	readonly isDirectory: boolean;
}