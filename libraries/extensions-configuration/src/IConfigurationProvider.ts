export interface IConfigurationProvider
{
	/**
	 * Get a configuration value for the specified key.
	 * @param key
	 */
	get(key: string): any | undefined;

	/**
	 * Loads configuration values from the source represented by this ConfigurationProvider.
	 * @returns {Promise<void>}
	 */
	load(): Promise<void> | void;
}