import ErrorWrap                 from "@netleaf/common/src/errors/ErrorWrap";
import { readFile }              from "fs/promises";
import { parse }                 from "json5";
import ConfigurationProviderBase from "./ConfigurationProviderBase";

export default class JsonConfigurationProvider extends ConfigurationProviderBase
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
			throw new Error(`Configuration from JSON file '${this.#configurationPath}' has not been loaded yet.`);
		}

		return super.get(key);
	}

	/**
	 * @inheritDoc
	 */
	async load(): Promise<void>
	{
		try
		{
			const json: string = await readFile(this.#configurationPath, { encoding: "utf-8" });
			this.configuration = parse(json);
		}
		catch (ex)
		{
			throw new ErrorWrap(`Error thrown while loading configuration from JSON file '${this.#configurationPath}'.`, ex);
		}
	}

}