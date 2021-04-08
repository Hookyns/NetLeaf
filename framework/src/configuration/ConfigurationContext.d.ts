import IHostEnvironment from "../IHostEnvironment";
export default class ConfigurationContext {
    #private;
    /**
     * Properties shared between components during application initialization.
     */
    get properties(): {
        [key: string]: any;
    };
    /**
     * Get instance of {@link IHostEnvironment}
     */
    get environment(): Readonly<IHostEnvironment>;
    /**
     * Construct ConfigurationContext
     * @param environment
     */
    constructor(environment: IHostEnvironment);
}
