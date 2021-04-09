import Configuration              from "./Configuration";
import ConfigurationValueProvider from "./ConfigurationValueProvider";
import IConfigurationProvider     from "./IConfigurationProvider";
import IRootConfiguration         from "./IRootConfiguration";

export default class RootConfiguration extends Configuration implements IRootConfiguration
{
	readonly #providers: IConfigurationProvider[];
	readonly #valueProvider: ConfigurationValueProvider;

	/**
	 * @inheritDoc
	 */
	get providers(): ReadonlyArray<IConfigurationProvider>
	{
		return this.#providers.slice();
	}

	/**
	 * Construct RootConfiguration.
	 * @param providers
	 * @param valueProvider
	 */
	constructor(providers: Array<IConfigurationProvider>, valueProvider: ConfigurationValueProvider)
	{
		super(undefined, "");
		this.#valueProvider = valueProvider;
		this.#providers = providers;
		this.root = this;
	}

	/**
	 * @inheritDoc
	 */
	get<TValue = any>(key: string): TValue | undefined
	{
		return this.#valueProvider.resolve<TValue>(this.#providers, key);
	}
}