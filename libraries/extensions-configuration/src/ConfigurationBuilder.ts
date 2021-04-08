import ErrorWrap                    from "@netleaf/common/src/errors/ErrorWrap";
import IConfigurationBuilder        from "./IConfigurationBuilder";
import IConfigurationProvider       from "./IConfigurationProvider";
import IRootConfiguration           from "./IRootConfiguration";
import ConsoleConfigurationProvider from "./providers/ConsoleConfigurationProvider";
import JsConfigurationProvider      from "./providers/JsConfigurationProvider";
import JsonConfigurationProvider    from "./providers/JsonConfigurationProvider";
import ObjectConfigurationProvider  from "./providers/ObjectConfigurationProvider";
import RootConfiguration            from "./RootConfiguration";

export default class ConfigurationBuilder implements IConfigurationBuilder
{
	/**
	 * Collection of providers
	 * @private
	 */
	readonly #providers: Array<IConfigurationProvider> = [];

	/**
	 * @inheritDoc
	 */
	setRootDirectory(rootDirectory: string): IConfigurationBuilder
	{
		throw new Error("Method not implemented.");
	}

	/**
	 * @inheritDoc
	 */
	addConsole(): IConfigurationBuilder
	{
		this.#providers.push(new ConsoleConfigurationProvider(process.argv.slice(2)));
		return this;
	}

	/**
	 * @inheritDoc
	 */
	addEnvironmentVariables(prefix?: string): IConfigurationBuilder
	{
		this.#providers.push(new ObjectConfigurationProvider(process.env));
		return this;
	}

	/**
	 * @inheritDoc
	 */
	addJsFile(configPath: string): IConfigurationBuilder
	{
		this.#providers.push(new JsConfigurationProvider(configPath));
		return this;
	}

	/**
	 * @inheritDoc
	 */
	addJsonFile(configPath: string): IConfigurationBuilder
	{
		this.#providers.push(new JsonConfigurationProvider(configPath));
		return this;
	}

	/**
	 * @inheritDoc
	 */
	addObject(object: { [p: string]: any }): IConfigurationBuilder
	{
		this.#providers.push(new ObjectConfigurationProvider(object));
		return this;
	}

	/**
	 * @inheritDoc
	 */
	async build(): Promise<IRootConfiguration>
	{
		try
		{
			// Load configurations of all providers
			await Promise.all(this.#providers.map(provider => provider.load()));

			// Create and return root configuration
			return new RootConfiguration(this.#providers);
		}
		catch (ex)
		{
			throw new ErrorWrap("Error thrown while loading configurations of registered configuration providers.", ex);
		}
	}

}