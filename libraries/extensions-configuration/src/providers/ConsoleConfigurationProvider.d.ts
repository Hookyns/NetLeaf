import ConfigurationProviderBase from "./ConfigurationProviderBase";
export default class ConsoleConfigurationProvider extends ConfigurationProviderBase {
    #private;
    /**
     * Construct instance of ConfigurationProvider
     * @param args
     */
    constructor(args: string[]);
    /**
     * @inheritDoc
     */
    get(key: string): any;
    /**
     * @inheritDoc
     */
    load(): Promise<void>;
}
