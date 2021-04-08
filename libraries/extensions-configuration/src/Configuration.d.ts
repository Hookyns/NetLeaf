import IConfiguration from "./IConfiguration";
import IConfigurationSection from "./IConfigurationSection";
import IRootConfiguration from "./IRootConfiguration";
export default class Configuration implements IConfiguration, IConfigurationSection {
    #private;
    /**
     * @inheritDoc
     */
    get path(): string;
    /**
     * @inheritDoc
     */
    get value(): any;
    /**
     * Construct Configuration.
     * @param root RootConfiguration
     * @param path Path of this configuration from the root
     */
    constructor(root: IRootConfiguration | undefined, path: string);
    /**
     * @inheritDoc
     */
    get<TValue = any>(key: string): TValue;
    /**
     * @inheritDoc
     */
    getSection(sectionName: string): IConfigurationSection;
}
