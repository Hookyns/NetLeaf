/**
 * Provides information about the hosting environment of running application.
 */
export default interface IHostEnvironment
{
	/**
	 * Gets or sets the name of the environment. 
	 * The host automatically sets this property to the value of the of the "environment" key as specified in configuration.
	 */
	environmentName: string;

	/**
	 * Gets or sets the name of the application. 
	 * This property is automatically set by the host to the name of module.main package name.
	 */
	applicationName: string;

	/**
	 * Checks if the current host environment name contains "development".
	 * @description Eg. "development", "development.something".
	 */
	isDevelopment(): boolean;

	/**
	 * Checks if the current host environment name is "production".
	 */
	isProduction(): boolean;

	/**
	 * Case insensitive compare of environmentName of the HostEnvironment.
	 */
	isEnvironment(): boolean;
}