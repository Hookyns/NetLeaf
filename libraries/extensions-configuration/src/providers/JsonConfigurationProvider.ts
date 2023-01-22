import { ErrorWrap }                   from "@netleaf/common";
import { readFile }                    from "fs/promises";
import { readFileSync }                from "fs";
import { parse }                       from "json5";
import * as path                       from "path";
import { ConfigurationBuilderContext } from "../ConfigurationBuilderContext";
import { FileConfigurationOptions }    from "../FileConfigurationOptions";
import { ConfigurationProviderBase }   from "./ConfigurationProviderBase";

export class JsonConfigurationProvider extends ConfigurationProviderBase
{
	/**
	 * Path to configuration file
	 * @private
	 */
	readonly #configurationPath: string;

	/**
	 * Configuration context.
	 * @private
	 */
	readonly #context: ConfigurationBuilderContext;

	/**
	 * Options.
	 * @type {FileConfigurationOptions}
	 */
	readonly #options: FileConfigurationOptions;

	/**
	 * Construct instance of ConfigurationProvider
	 * @param configurationPath
	 * @param context
	 * @param options
	 */
	constructor(configurationPath: string, context: ConfigurationBuilderContext, options?: FileConfigurationOptions)
	{
		super();
		this.#configurationPath = configurationPath;
		this.#context = context;
		this.#options = options || {};
	}

	/**
	 * @inheritDoc
	 */
	get(key: string): any
	{
		if (this.configuration === undefined)
		{
			throw new Error(`Configuration from JSON file '${this.#configurationPath}' has not been loaded yet.`);
		}

		return super.get(key);
	}

	/**
	 * @inheritDoc
	 */
	load(): Promise<void> | void
	{
		if (this.#options?.synchronous === true)
		{
			return this.loadSync();
		}

		return this.loadAsync();
	}

	loadSync(): void
	{
		const fileProvider = this.#options?.fileProvider ?? this.#context.getFileProvider();
		let configurationPath = this.#configurationPath;

		if (fileProvider)
		{
			const fileInfo = fileProvider.getFileInfoSync(configurationPath);

			if (!fileInfo?.exists)
			{
				if (this.#options?.optional)
				{
					this.configuration = {};
					return;
				}

				throw new Error(`Configuration JSON file '${configurationPath}' does not exists or is not accessible.`);
			}

			configurationPath = fileInfo.path;
		}
		else if (!path.isAbsolute(configurationPath))
		{
			throw new Error(`Unable to resolve path of JSON configuration file '${configurationPath}'.`
				+ `Use absolute path or set FileProvider instance into ConfigurationBuilderContext properties with key '${ConfigurationBuilderContext.FileProviderPropertyKey}'.`);
		}

		try
		{
			const json: string = readFileSync(configurationPath, { encoding: "utf-8" });
			this.configuration = parse(json);
		}
		catch (ex)
		{
			throw new ErrorWrap(
				`Error thrown while loading configuration from JSON file '${configurationPath}'.`,
				ex as Error
			);
		}
	}

	async loadAsync(): Promise<void>
	{
		const fileProvider = this.#options?.fileProvider ?? this.#context.getFileProvider();
		let configurationPath = this.#configurationPath;

		if (fileProvider)
		{
			const fileInfo = await fileProvider.getFileInfo(configurationPath);

			if (!fileInfo?.exists)
			{
				if (this.#options?.optional)
				{
					this.configuration = {};
					return;
				}

				throw new Error(`Configuration JSON file '${configurationPath}' does not exists or is not accessible.`);
			}

			configurationPath = fileInfo.path;
		}
		else if (!path.isAbsolute(configurationPath))
		{
			throw new Error(`Unable to resolve path of JSON configuration file '${configurationPath}'.`
				+ `Use absolute path or set FileProvider instance into ConfigurationBuilderContext properties with key '${ConfigurationBuilderContext.FileProviderPropertyKey}'.`);
		}

		try
		{
			const json: string = await readFile(configurationPath, { encoding: "utf-8" });
			this.configuration = parse(json);
		}
		catch (ex)
		{
			throw new ErrorWrap(
				`Error thrown while loading configuration from JSON file '${configurationPath}'.`,
				ex as Error
			);
		}
	}

}