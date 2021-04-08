import IConfiguration        from "./IConfiguration";
import IConfigurationSection from "./IConfigurationSection";
import IRootConfiguration    from "./IRootConfiguration";
import * as PathHelper       from "./PathHelper";

export default class Configuration implements IConfiguration, IConfigurationSection
{
	readonly #path: string;
	#root?: IRootConfiguration;

	/**
	 * Set root configuration
	 * @param root
	 * @internal
	 */
	set root(root: IRootConfiguration)
	{
		this.#root = root;
	}

	/**
	 * @inheritDoc
	 */
	get path(): string
	{
		return this.#path;
	}

	/**
	 * @inheritDoc
	 */
	get value(): any
	{
		return this.get("");
	}

	/**
	 * Construct Configuration.
	 * @param root RootConfiguration
	 * @param path Path of this configuration from the root
	 */
	constructor(root: IRootConfiguration | undefined, path: string)
	{
		this.#root = root;
		this.#path = path;
	}

	/**
	 * @inheritDoc
	 */
	get<TValue = any>(key: string): TValue
	{
		if (!this.#root)
		{
			throw new Error(`RootConfiguration has not beet set to this Configuration with path ${this.#path}.`);
		}

		return this.#root.get(PathHelper.combine(this.#path, key));
	}

	/**
	 * @inheritDoc
	 */
	getSection(sectionName: string): IConfigurationSection
	{
		if (!this.#root)
		{
			throw new Error(`RootConfiguration has not beet set to this Configuration with path ${this.#path}.`);
		}

		return new Configuration(this.#root, PathHelper.combine(this.#path, sectionName));
	}
}