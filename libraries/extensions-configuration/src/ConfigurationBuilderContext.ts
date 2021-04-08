import { IFileProvider } from "../../extensions-file-provider";

export default class ConfigurationBuilderContext
{
	readonly #properties: { [key: string]: any; } = {};
	#fileProvider: IFileProvider = {};

	/**
	 * Properties shared between components during application initialization.
	 */
	get properties(): { [key: string]: any }
	{
		return this.#properties;
	}
}