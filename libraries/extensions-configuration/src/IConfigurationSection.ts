import IConfiguration from "./IConfiguration";

type IConfigurationSection = IConfiguration &
	{
		readonly path: string;
		readonly value: any;
	};

export default IConfigurationSection;