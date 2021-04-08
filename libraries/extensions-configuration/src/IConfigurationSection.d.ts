import IConfiguration from "./IConfiguration";
declare type IConfigurationSection = IConfiguration & {
    readonly path: string;
    readonly value: any;
};
export default IConfigurationSection;
