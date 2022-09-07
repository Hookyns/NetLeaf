import IConfigurationSection from "./IConfigurationSection";

/**
 * @template TConfig
 */
type IConfiguration<TConfig = any> = {
	/**
	 * Return configuration value with a specified key or return undefined if value does not exist.
	 * @template TVal
	 * @param {TVal} key
	 * @returns {any | undefined}
	 */
	get<TVal extends keyof TConfig>(key: TVal): TConfig[TVal] | undefined;

	/**
	 * Return configuration value with a specified key or return undefined if value does not exist.
	 * @param key
	 * @returns {any | undefined}
	 */
	get<TVal = any>(key: string): TVal | undefined;

	/**
	 * Return configuration section with a specified name.
	 * @description If no section is found with the specified name, an empty configuration is returned.
	 * @template TSection
	 * @param {TSection} sectionName
	 * @returns {IConfigurationSection<any>}
	 */
	getSection<TSection extends keyof TConfig>(sectionName: TSection): IConfigurationSection<TConfig[TSection]>;

	/**
	 * Return configuration section with a specified name.
	 * @description If no section is found with the specified name, an empty configuration is returned.
	 * @param {string} sectionName
	 * @returns {IConfigurationSection<any>}
	 */
	getSection(sectionName: string): IConfigurationSection<any>;

	/**
	 * Return collection of configurations sections contained in this configuration.
	 */
	getSections<TSection = unknown>(): Array<IConfigurationSection<TSection>>;
};

export default IConfiguration;