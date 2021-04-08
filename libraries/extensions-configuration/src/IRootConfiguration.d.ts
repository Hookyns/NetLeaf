import IConfiguration from "./IConfiguration";
import IConfigurationProvider from "./IConfigurationProvider";
declare type IRootConfiguration = IConfiguration & {
    /**
     * Array of configuration providers used to create this configuration.
     */
    providers: ReadonlyArray<IConfigurationProvider>;
};
export default IRootConfiguration;
