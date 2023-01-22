import { PhysicalFileProvider }         from "@netleaf/extensions-file-provider";
import * as path                        from "path";
import { ErrorWrap }                    from "@netleaf/common";
import { ConfigurationBuilderContext }  from "./ConfigurationBuilderContext";
import { ConfigurationValueProvider }   from "./ConfigurationValueProvider";
import { FileConfigurationOptions }     from "./FileConfigurationOptions";
import { IConfigurationBuilder }        from "./IConfigurationBuilder";
import { IConfigurationProvider }       from "./IConfigurationProvider";
import { IRootConfiguration }           from "./IRootConfiguration";
import { ConsoleConfigurationProvider } from "./providers/ConsoleConfigurationProvider";
import { JsConfigurationProvider }      from "./providers/JsConfigurationProvider";
import { JsonConfigurationProvider }    from "./providers/JsonConfigurationProvider";
import { ObjectConfigurationProvider }  from "./providers/ObjectConfigurationProvider";
import { resolveSync }                  from "./resolveSync";
import { RootConfiguration }            from "./RootConfiguration";

export class ConfigurationBuilder implements IConfigurationBuilder
{
	/**
	 * Collection of providers.
	 * @private
	 */
	readonly #providers: Array<IConfigurationProvider> = [];

	/**
	 * Builder context.
	 * @private
	 */
	readonly #context: ConfigurationBuilderContext;

	/**
	 * Root directory path used to resolve configuration files.
	 * @private
	 */
	#rootDirectory: string;

	/**
	 * Configuration value provider instance.
	 * @private
	 */
	#configurationValueProvider: ConfigurationValueProvider;

	/**
	 * Get configuration builder context.
	 */
	get context(): ConfigurationBuilderContext
	{
		return this.#context;
	}

	/**
	 * Construct ConfigurationBuilder.
	 */
	constructor()
	{
		this.#context = new ConfigurationBuilderContext();
		this.#rootDirectory = path.normalize(path.dirname(require.main?.path ?? process.cwd()));
		this.#configurationValueProvider = new ConfigurationValueProvider();

		this.createFileProvider();
	}

	/**
	 * @inheritDoc
	 */
	setRootDirectory(rootDirectory: string): IConfigurationBuilder
	{
		rootDirectory = path.resolve(rootDirectory || "");

		// Do nothing if new rootDirectory is the same
		if (rootDirectory == this.#rootDirectory)
		{
			return this;
		}

		this.#rootDirectory = rootDirectory;
		this.createFileProvider();

		return this;
	}

	/**
	 * @inheritDoc
	 */
	setValueProvider(valueProvider: ConfigurationValueProvider): IConfigurationBuilder
	{
		this.#configurationValueProvider = valueProvider || undefined;
		return this;
	}

	/**
	 * @inheritDoc
	 */
	addProvider(provider: IConfigurationProvider): IConfigurationBuilder
	{
		this.#providers.push(provider);
		return this;
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
		let variables = process.env;

		if (prefix)
		{
			variables = Object.fromEntries(
				Object
					.entries(variables)
					.filter(([key]) => key.startsWith(prefix))
			);
		}

		this.#providers.push(new ObjectConfigurationProvider(variables));
		return this;
	}

	/**
	 * @inheritDoc
	 */
	addJsFile(configPath: string, options?: FileConfigurationOptions): IConfigurationBuilder
	{
		this.#providers.push(new JsConfigurationProvider(configPath, this.#context, options));
		return this;
	}

	/**
	 * @inheritDoc
	 */
	addJsonFile(configPath: string, options?: FileConfigurationOptions): IConfigurationBuilder
	{
		this.#providers.push(new JsonConfigurationProvider(configPath, this.#context, options));
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

			// Create and return root configuration; reverse providers cuz of first match return behavior; and we want
			// to prioritize last - like overrides.
			return new RootConfiguration(this.#providers.slice().reverse(), this.#configurationValueProvider);
		}
		catch (ex)
		{
			throw new ErrorWrap(
				"Error thrown while loading configurations of registered configuration providers.",
				ex as Error
			);
		}
	}

	/**
	 * @inheritDoc
	 */
	buildSync(): IRootConfiguration
	{
		try
		{
			// Load configurations of all providers
			for (let provider of this.#providers)
			{
				const rtrn = provider.load();

				if (!!rtrn)
				{
					resolveSync(rtrn);
				}
			}

			// Create and return root configuration; reverse providers cuz of first match return behavior; and we want
			// to prioritize last - like overrides.
			return new RootConfiguration(this.#providers.slice().reverse(), this.#configurationValueProvider);
		}
		catch (ex)
		{
			throw new ErrorWrap(
				"Error thrown while loading configurations of registered configuration providers.",
				ex as Error
			);
		}
	}

	/**
	 * Create {@link IFileProvider} over {@link this.#rootDirectory}.
	 * @private
	 */
	private createFileProvider()
	{
		this.#context.properties[ConfigurationBuilderContext.FileProviderPropertyKey] = new PhysicalFileProvider(this.#rootDirectory);
	}

}