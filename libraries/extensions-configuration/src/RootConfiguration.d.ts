import Configuration from "./Configuration";
import IConfigurationProvider from "./IConfigurationProvider";
import IRootConfiguration from "./IRootConfiguration";
export default class RootConfiguration extends Configuration implements IRootConfiguration {
    #private;
    /**
     * @inheritDoc
     */
    get providers(): ReadonlyArray<IConfigurationProvider>;
    /**
     * Construct RootConfiguration.
     * @param providers
     */
    constructor(providers: Array<IConfigurationProvider>);
}
