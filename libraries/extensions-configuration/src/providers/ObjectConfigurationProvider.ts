import ConfigurationProviderBase from "./ConfigurationProviderBase";

export default class ObjectConfigurationProvider extends ConfigurationProviderBase
{
	/**
	 * Source object with configuration.
	 * @private
	 */
	readonly #object: { [key: string]: any };

	/**
	 * Construct instance of ConfigurationProvider
	 * @param object
	 */
	constructor(object: { [key: string]: any })
	{
		super();
		this.#object = object || {};
	}

	/**
	 * @inheritDoc
	 */
	async load(): Promise<void>
	{
		if (this.#object.constructor != Object)
		{
			throw new Error("Configuration object must be plain JS object.");
		}

		this.configuration = this.#object;
	}

}