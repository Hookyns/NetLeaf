import IConfigurationBuilder from "./IConfigurationBuilder";
import IRootConfiguration from "./IRootConfiguration";
export default class ConfigurationBuilder implements IConfigurationBuilder {
    #private;
    /**
     * @inheritDoc
     */
    addConsole(): IConfigurationBuilder;
    /**
     * @inheritDoc
     */
    addEnvironmentVariables(prefix?: string): IConfigurationBuilder;
    /**
     * @inheritDoc
     */
    addJsFile(configPath: string): IConfigurationBuilder;
    /**
     * @inheritDoc
     */
    addJsonFile(configPath: string): IConfigurationBuilder;
    /**
     * @inheritDoc
     */
    addObject(object: {
        [p: string]: any;
    }): IConfigurationBuilder;
    /**
     * @inheritDoc
     */
    build(): Promise<IRootConfiguration>;
}
