import ErrorWrap                 from "@netleaf/common/src/errors/ErrorWrap";
import ConfigurationProviderBase from "./ConfigurationProviderBase";

export default class JsConfigurationProvider extends ConfigurationProviderBase
{
	/**
	 * Path to configuration file
	 * @private
	 */
	readonly #configurationPath: string;

	/**
	 * Construct instance of ConfigurationProvider
	 * @param configurationPath
	 */
	constructor(configurationPath: string)
	{
		super();
		this.#configurationPath = configurationPath;
	}

	/**
	 * @inheritDoc
	 */
	get(key: string): any
	{
		if (this.configuration === undefined)
		{
			throw new Error(`Configuration from JS file '${this.#configurationPath}' has not been loaded yet.`);
		}

		return super.get(key);
	}

	/**
	 * @inheritDoc
	 */
	async load(): Promise<void>
	{
		let result;

		try
		{
			result = await import(this.#configurationPath);
		}
		catch (ex)
		{
			throw new ErrorWrap(`Error thrown while loading configuration from JS file '${this.#configurationPath}'.`, ex);
		}

		if (result.hasOwnProperty("default"))
		{
			result = result.default;
		}

		if (result instanceof Promise)
		{
			try
			{
				result = await result;
			}
			catch (ex)
			{
				throw new ErrorWrap(`Promise returned from JS configuration file '${this.#configurationPath}' has been rejected.`, ex);
			}
		}

		if (result.constructor == Object)
		{
			this.configuration = result;
		}
		else
		{
			throw new Error(`Unable to get configuration from JS file '${this.#configurationPath}'. Returned value is not plain JS object.`);
		}
	}

}