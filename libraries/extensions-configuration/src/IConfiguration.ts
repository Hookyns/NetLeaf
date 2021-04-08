import IConfigurationSection from "./IConfigurationSection";

type IConfiguration/*<TConfiguration = never> = (
		TConfiguration extends never
			? { [key: string]: any }
			: ({ [key in keyof TConfiguration]: TConfiguration[key] extends Function ? never : TConfiguration[key] })
		)*/
	= /*{ [key: string]: any }
	&*/ {
	get<TValue = any>(key: string): TValue;

	/**
	 * Return configuration section with a specified name.
	 * @description If no matching section is found with the specified name, an empty configuration is returned.
	 */
	getSection(sectionName: string): IConfigurationSection;

	// /**
	//  * Return configuration value
	//  */
	// getValue<TValue>(): TValue;
};

export default IConfiguration;