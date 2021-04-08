export default interface IConfigurationProvider
{
	/**
	 * Get a configuration value for the specified key.
	 * @param key
	 */
	get(key: string): any;

	/**
	 * Loads configuration values from the source represented by this ConfigurationProvider.
	 */
	load(): Promise<void>;
}