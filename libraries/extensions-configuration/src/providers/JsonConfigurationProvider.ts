import ErrorWrap                   from "@netleaf/common/src/errors/ErrorWrap";
import { readFile }                from "fs/promises";
import { parse }                   from "json5";
import * as path                   from "path";
import ConfigurationBuilderContext from "../ConfigurationBuilderContext";
import ConfigurationProviderBase   from "./ConfigurationProviderBase";

export default class JsonConfigurationProvider extends ConfigurationProviderBase
{
	/**
	 * Path to configuration file
	 * @private
	 */
	readonly #configurationPath: string;

	/**
	 * Configuration context.
	 * @private
	 */
	readonly #context: ConfigurationBuilderContext;

	/**
	 * Construct instance of ConfigurationProvider
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
			throw new Error(`Configuration from JSON file '${this.#configurationPath}' has not been loaded yet.`);
		}

		return super.get(key);
	}

	/**
	 * @inheritDoc
	 */
	async load(): Promise<void>
	{
		const fileProvider = this.#context.getFileProvider();
		let configurationPath = this.#configurationPath;

		if (fileProvider)
		{
			const fileInfo = await fileProvider.getFileInfo(configurationPath);

			if (!fileInfo?.exists)
			{
				throw new Error(`Configuration JSON file '${configurationPath}' does not exists or is not accessible.`);
			}

			configurationPath = fileInfo.path;
		}
		else if (!path.isAbsolute(configurationPath))
		{
			throw new Error(`Unable to resolve path of JSON configuration file '${configurationPath}'.`
				+ `Use absolute path or set FileProvider instance into ConfigurationBuilderContext properties with key '${ConfigurationBuilderContext.FileProviderPropertyKey}'.`);
		}

		try
		{
			const json: string = await readFile(configurationPath, { encoding: "utf-8" });
			this.configuration = parse(json);
		}
		catch (ex)
		{
			throw new ErrorWrap(`Error thrown while loading configuration from JSON file '${configurationPath}'.`, ex);
		}
	}

}