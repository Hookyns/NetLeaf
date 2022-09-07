import { IConfiguration }         from "./IConfiguration";
import { IConfigurationProvider } from "./IConfigurationProvider";

export type IRootConfiguration<T = any> = IConfiguration<T> & {
	/**
	 * Array of configuration providers used to create this configuration.
	 */
	providers: ReadonlyArray<IConfigurationProvider>;
};