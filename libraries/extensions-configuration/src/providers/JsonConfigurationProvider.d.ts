import ConfigurationProviderBase from "./ConfigurationProviderBase";
export default class JsonConfigurationProvider extends ConfigurationProviderBase {
    #private;
    /**
     * Construct instance of ConfigurationProvider
     * @param configurationPath
     */
    constructor(configurationPath: string);
    /**
     * @inheritDoc
     */
    get(key: string): any;
    /**
     * @inheritDoc
     */
    load(): Promise<void>;
}
