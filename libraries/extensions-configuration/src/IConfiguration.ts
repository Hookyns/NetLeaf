import IConfigurationSection from "./IConfigurationSection";

type IConfiguration = {
	/**
	 * Return configuration value with a specified key or return undefined if value does not exist.
	 * @param key
	 */
	get<TValue = any>(key: string): TValue | undefined;

	/**
	 * Return configuration section with a specified name.
	 * @description If no section is found with the specified name, an empty configuration is returned.
	 */
	getSection(sectionName: string): IConfigurationSection;

	/**
	 * Return collection of configurations sections contained in this configuration.
	 */
	getSections(): Array<IConfigurationSection>;
};

export default IConfiguration;