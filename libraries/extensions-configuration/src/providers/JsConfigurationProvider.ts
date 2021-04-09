import ErrorWrap                   from "@netleaf/common/src/errors/ErrorWrap";
import * as path                   from "path";
import ConfigurationBuilderContext from "../ConfigurationBuilderContext";
import ConfigurationProviderBase   from "./ConfigurationProviderBase";

export default class JsConfigurationProvider extends ConfigurationProviderBase
{
	/**
	 * Path to configuration file.
	 * @private
	 */
	readonly #configurationPath: string;

	/**
	 * Configuration context.
	 * @private
	 */
	readonly #context: ConfigurationBuilderContext;

	/**
	 * Construct instance of ConfigurationProvider.
	 * @param configurationPath
	 * @param context
	 */
	constructor(configurationPath: string, context: ConfigurationBuilderContext)
	{
		super();
		this.#configurationPath = configurationPath;
		this.#context = context;
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

		const fileProvider = this.#context.getFileProvider();
		let configurationPath = this.#configurationPath;

		if (fileProvider)
		{
			const fileInfo = await fileProvider.getFileInfo(configurationPath);

			if (!fileInfo.exists)
			{
				throw new Error(`Configuration JS file '${configurationPath}' does not exists or is not accessible.`);
			}

			configurationPath = fileInfo.path;
		}
		else if (!path.isAbsolute(configurationPath))
		{
			throw new Error(`Unable to resolve path of JS configuration file '${configurationPath}'.`
				+ `Use absolute path or set FileProvider instance into ConfigurationBuilderContext properties with key '${ConfigurationBuilderContext.FileProviderPropertyKey}'.`);
		}

		try
		{
			result = await import(configurationPath);
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