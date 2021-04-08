import ErrorWrap                 from "@netleaf/common/src/errors/ErrorWrap";
import * as minimist             from "minimist";
import ConfigurationProviderBase from "./ConfigurationProviderBase";

export default class ConsoleConfigurationProvider extends ConfigurationProviderBase
{
	/**
	 * Args from command line.
	 * @private
	 */
	readonly #args: Array<string>;

	/**
	 * Construct instance of ConfigurationProvider
	 * @param args
	 */
	constructor(args: string[])
	{
		super();
		this.#args = args;
	}

	/**
	 * @inheritDoc
	 */
	get(key: string): any
	{
		if (this.configuration === undefined)
		{
			throw new Error(`Configuration from console arguments has not been loaded yet.`);
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
			this.configuration = minimist(this.#args);
		}
		catch (ex)
		{
			throw new ErrorWrap(`Error thrown while parsing configuration from console arguments.`, ex);
		}
	}

}