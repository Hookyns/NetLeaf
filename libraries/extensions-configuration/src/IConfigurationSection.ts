import IConfiguration from "./IConfiguration";

type IConfigurationSection<T = any> = IConfiguration<T> &
	{
		readonly path: string;
		readonly value: T;
	};

export default IConfigurationSection;