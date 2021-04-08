import IConfigurationSection from "./IConfigurationSection";
declare type IConfiguration = {
    get<TValue = any>(key: string): TValue;
    /**
     * Return configuration section with a specified name.
     * @description If no matching section is found with the specified name, an empty configuration is returned.
     */
    getSection(sectionName: string): IConfigurationSection;
};
export default IConfiguration;
