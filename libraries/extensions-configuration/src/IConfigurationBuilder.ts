import { ConfigurationBuilderContext } from "./ConfigurationBuilderContext";
import { ConfigurationValueProvider }  from "./ConfigurationValueProvider";
import { FileConfigurationOptions }    from "./FileConfigurationOptions";
import { IConfigurationProvider }      from "./IConfigurationProvider";
import { IRootConfiguration }          from "./IRootConfiguration";

export interface IConfigurationBuilder
{
	/**
	 * Get configuration builder context.
	 */
	readonly context: ConfigurationBuilderContext;

	/**
	 * Add an IConfigurationProvider that reads configuration from JSON file.
	 * @param configPath
	 * @param options
	 */
	addJsonFile(configPath: string, options?: FileConfigurationOptions): IConfigurationBuilder;

	/**
	 * Add an IConfigurationProvider that reads configuration from JS file.
	 * @description JS file should have default export and exported object
	 * can be plain object with configuration or Promise.
	 * @param configPath
	 * @param options
	 */
	addJsFile(configPath: string, options?: FileConfigurationOptions): IConfigurationBuilder;

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
	 * Add the specified IConfigurationProvider instance.
	 * @param provider
	 */
	addProvider(provider: IConfigurationProvider): IConfigurationBuilder;

	/**
	 * Set root directory used to resolve file configurations.
	 * @param rootDirectory
	 */
	setRootDirectory(rootDirectory: string): IConfigurationBuilder;

	/**
	 * Set provider which resolves values from configuration.
	 * @param valueProvider
	 */
	setValueProvider(valueProvider: ConfigurationValueProvider): IConfigurationBuilder;

	/**
	 * Build configuration.
	 */
	build(): Promise<IRootConfiguration>;
}