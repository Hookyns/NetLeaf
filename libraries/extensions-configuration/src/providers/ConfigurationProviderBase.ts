import { IConfigurationProvider } from "../IConfigurationProvider";
import { KeySplitChar }           from "../PathHelper";

export abstract class ConfigurationProviderBase implements IConfigurationProvider
{
	/**
	 * Loaded configuration
	 * @private
	 */
	protected configuration?: { [key: string]: any };

	/**
	 * @inheritDoc
	 */
	get(key: string): any
	{
		if (!this.configuration)
		{
			return undefined;
		}

		if (!key)
		{
			return this.configuration;
		}

		const parts = key.split(KeySplitChar);
		let prop = parts[0];
		let obj = this.configuration[prop];
		let partIndex = 0;

		while (partIndex < parts.length - 1 && obj != undefined)
		{
			partIndex++;
			prop = parts[partIndex];
			obj = obj[prop];
		}

		return obj;
	}

	abstract load(): Promise<void> | void;
}