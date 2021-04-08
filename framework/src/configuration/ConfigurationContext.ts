import IHostEnvironment from "../IHostEnvironment";

export default class ConfigurationContext
{
	readonly #properties: { [key: string]: any; } = {};
	readonly #environment: IHostEnvironment;

	/**
	 * Properties shared between components during application initialization.
	 */
	get properties(): { [key: string]: any }
	{
		return this.#properties;
	}

	/**
	 * Get instance of {@link IHostEnvironment}
	 */
	get environment(): Readonly<IHostEnvironment>
	{
		return this.#environment;
	}

	/**
	 * Construct ConfigurationContext
	 * @param environment
	 */
	constructor(environment: IHostEnvironment)
	{
		this.#environment = Object.freeze(environment);
	}
}