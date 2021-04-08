import IConfigurationProvider from "../IConfigurationProvider";
export default abstract class ConfigurationProviderBase implements IConfigurationProvider {
    /**
     * Loaded configuration
     * @private
     */
    protected configuration?: {
        [key: string]: any;
    };
    /**
     * @inheritDoc
     */
    get(key: string): any;
    abstract load(): Promise<void>;
}
