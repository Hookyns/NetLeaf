import { IFileProvider } from "@netleaf/extensions-file-provider";

export default class ConfigurationBuilderContext
{
	static readonly FileProviderPropertyKey = "Configuration.FileProvider";

	readonly #properties: { [key: string]: any; } = {};

	/**
	 * Properties shared between components during application initialization.
	 */
	get properties(): { [key: string]: any }
	{
		return this.#properties;
	}

	/**
	 * Get {@link IFileProvider} stored in properties or return undefined.
	 */
	getFileProvider(): IFileProvider | undefined
	{
		return this.properties[ConfigurationBuilderContext.FileProviderPropertyKey] || undefined;
	}
}