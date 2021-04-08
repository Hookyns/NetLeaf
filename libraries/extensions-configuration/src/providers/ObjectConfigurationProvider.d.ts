import ConfigurationProviderBase from "./ConfigurationProviderBase";
export default class ObjectConfigurationProvider extends ConfigurationProviderBase {
    #private;
    /**
     * Construct instance of ConfigurationProvider
     * @param object
     */
    constructor(object: {
        [key: string]: any;
    });
    /**
     * @inheritDoc
     */
    load(): Promise<void>;
}
