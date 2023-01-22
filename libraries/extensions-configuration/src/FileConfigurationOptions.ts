import { IFileProvider } from "@netleaf/extensions-file-provider";

export type FileConfigurationOptions = {
	/**
	 * Configuration is optional.
	 */
	optional?: boolean,

	/**
	 * Use specific file resolver
	 */
	fileProvider?: IFileProvider,

	/**
	 * Load file in synchronous manner.
	 */
	synchronous?: boolean
}; 