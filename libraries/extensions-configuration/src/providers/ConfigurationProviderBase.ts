import IConfigurationProvider from "../IConfigurationProvider";
import { KeySplitChar }       from "../PathHelper";

export default abstract class ConfigurationProviderBase implements IConfigurationProvider
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
		if (!key)
		{
			throw new Error("Argument 'key' cannot be falsy.");
		}

		if (!this.configuration)
		{
			return undefined;
		}

		const parts = key.split(KeySplitChar);
		let prop = parts[0];
		let obj = this.configuration[prop];
		// let path = prop;
		let partIndex = 0;

		while (partIndex < parts.length -1 && obj != undefined)
		{
			partIndex++;
			prop = parts[partIndex];
			obj = obj[prop];
			// path += KeySplitChar + prop;
		}

		return obj;
	}

	abstract load(): Promise<void>;
}