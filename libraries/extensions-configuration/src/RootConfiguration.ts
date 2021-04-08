import Configuration          from "./Configuration";
import IConfigurationProvider from "./IConfigurationProvider";
import IRootConfiguration     from "./IRootConfiguration";

export default class RootConfiguration extends Configuration implements IRootConfiguration
{
	readonly #providers: IConfigurationProvider[];

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
	 */
	constructor(providers: Array<IConfigurationProvider>)
	{
		super(undefined, "");
		this.root = this;
		this.#providers = providers;
	}
}