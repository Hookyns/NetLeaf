import { ErrorWrap }                   from "@netleaf/common";
import * as path                       from "path";
import { ConfigurationBuilderContext } from "../ConfigurationBuilderContext";
import { FileConfigurationOptions }    from "../FileConfigurationOptions";
import { resolveSync }                 from "../resolveSync";
import { ConfigurationProviderBase }   from "./ConfigurationProviderBase";

export class JsConfigurationProvider extends ConfigurationProviderBase
{
	/**
	 * Path to configuration file.
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
	 * Construct instance of ConfigurationProvider.
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
			throw new Error(`Configuration from JS file '${this.#configurationPath}' has not been loaded yet.`);
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

	private async loadAsync()
	{
		const fileProvider = this.#options?.fileProvider ?? this.#context.getFileProvider();
		let configurationPath = this.#configurationPath;

		if (fileProvider)
		{
			const fileInfo = await fileProvider.getFileInfo(configurationPath);

			if (!fileInfo.exists)
			{
				if (this.#options?.optional)
				{
					this.configuration = {};
					return;
				}

				throw new Error(`Configuration JS file '${configurationPath}' does not exists or is not accessible.`);
			}

			configurationPath = fileInfo.path;
		}
		else if (!path.isAbsolute(configurationPath))
		{
			throw new Error(`Unable to resolve path of JS configuration file '${configurationPath}'.`
				+ "Use absolute path or set FileProvider instance into ConfigurationBuilderContext"
				+ ` properties with key '${ConfigurationBuilderContext.FileProviderPropertyKey}'.`);
		}

		let result;

		try
		{
			result = await import(configurationPath);
		}
		catch (ex)
		{
			throw new ErrorWrap(
				`Error thrown while loading configuration from JS file '${this.#configurationPath}'.`,
				ex as Error
			);
		}

		if (result.hasOwnProperty("default"))
		{
			result = result.default;
		}

		if (result instanceof Promise)
		{
			try
			{
				result = await result;
			}
			catch (ex)
			{
				throw new ErrorWrap(
					`Promise returned from JS configuration file '${this.#configurationPath}' has been rejected.`,
					ex as Error
				);
			}
		}

		if (result.constructor == Object)
		{
			this.configuration = result;
		}
		else
		{
			throw new Error(`Unable to get configuration from JS file '${this.#configurationPath}'. Returned value is not plain JS object.`);
		}
	}

	private loadSync()
	{

		const fileProvider = this.#options?.fileProvider ?? this.#context.getFileProvider();
		let configurationPath = this.#configurationPath;
		let result;

		if (fileProvider)
		{
			const fileInfo = fileProvider.getFileInfoSync(configurationPath);

			if (!fileInfo.exists)
			{
				if (this.#options?.optional)
				{
					this.configuration = {};
					return;
				}

				throw new Error(`Configuration JS file '${configurationPath}' does not exists or is not accessible.`);
			}

			configurationPath = fileInfo.path;
		}
		else if (!path.isAbsolute(configurationPath))
		{
			throw new Error(`Unable to resolve path of JS configuration file '${configurationPath}'.`
				+ "Use absolute path or set FileProvider instance into ConfigurationBuilderContext"
				+ ` properties with key '${ConfigurationBuilderContext.FileProviderPropertyKey}'.`);
		}

		try
		{
			if (typeof require !== "undefined")
			{
				result = require(configurationPath);
			}
			else
			{
				result = resolveSync(import(configurationPath));
			}
		}
		catch (ex)
		{
			throw new ErrorWrap(
				`Error thrown while loading configuration from JS file '${this.#configurationPath}'.`,
				ex as Error
			);
		}

		if (result.hasOwnProperty("default"))
		{
			result = result.default;
		}

		if (result instanceof Promise)
		{
			try
			{
				result = resolveSync(result);
			}
			catch (ex)
			{
				throw new ErrorWrap(
					`Failed to synchronously resolve Promise returned from JS configuration file '${this.#configurationPath}'.`,
					ex as Error
				);
			}
		}

		if (result.constructor == Object)
		{
			this.configuration = result;
		}
		else
		{
			throw new Error(`Unable to get configuration from JS file '${this.#configurationPath}'. Returned value is not plain JS object.`);
		}
	}
}