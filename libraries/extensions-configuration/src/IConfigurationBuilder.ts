import ConfigurationValueProvider from "./ConfigurationValueProvider";
import IRootConfiguration         from "./IRootConfiguration";

export default interface IConfigurationBuilder
{
	/**
	 * Add an IConfigurationProvider that reads configuration from JSON file.
	 * @param configPath
	 */
	addJsonFile(configPath: string): IConfigurationBuilder;

	/**
	 * Add an IConfigurationProvider that reads configuration from JS file.
	 * @description JS file should have default export and exported object can be plain object with configuration or Promise.
	 * @param configPath
	 */
	addJsFile(configPath: string): IConfigurationBuilder;

	/**
	 * Adds an IConfigurationProvider that reads configuration values from environment variables.
	 * @param prefix
	 */
	addEnvironmentVariables(prefix?: string): IConfigurationBuilder;

	/**
	 * Add an IConfigurationProvider that reads configuration from process args.
	 */
	addConsole(): IConfigurationBuilder;

	/**
	 * Add an IConfigurationProvider that reads configuration from in-memory object.
	 * @param object
	 */
	addObject(object: { [key: string]: any }): IConfigurationBuilder;

	/**
	 * Set root directory used to resolve file configurations.
	 * @param rootDirectory
	 */
	setRootDirectory(rootDirectory: string): IConfigurationBuilder;

	/**
	 * Set provider which resolves values from configuration.
	 * @param valueProvider
	 */
	setValueProvider(valueProvider: ConfigurationValueProvider): IConfigurationBuilder

	/**
	 * Build configuration.
	 */
	build(): Promise<IRootConfiguration>;
}