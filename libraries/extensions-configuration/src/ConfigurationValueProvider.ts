import IConfigurationProvider from "./IConfigurationProvider";

export default class ConfigurationValueProvider
{
	/**
	 * Return value under specified key from configuration providers.
	 * @param providers
	 * @param key
	 */
	resolve<TValue = any>(providers: Array<IConfigurationProvider>, key: string): TValue | undefined
	{
		for (const provider of providers)
		{
			const value = provider.get(key);

			if (value !== undefined) {
				return value;
			}
		}

		return undefined;
	}
}