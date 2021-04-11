import { LogLevel } from "./LogLevel";

export default interface ILogger
{
	/**
	 * Write a general log entry.
	 * @param level
	 * @param message
	 * @param args
	 * @param error
	 */
	log(level: LogLevel, message: string, args?: { [key: string]: any }, error?: Error);

	/**
	 * Write a critical log entry.
	 * @param message
	 * @param args
	 * @param error
	 */
	logCritical(message: string, args?: { [key: string]: any }, error?: Error);

	/**
	 * Write an error log entry.
	 * @param message
	 * @param args
	 * @param error
	 */
	logError(message: string, args?: { [key: string]: any }, error?: Error);

	/**
	 * Write a warning log entry.
	 * @param message
	 * @param args
	 * @param error
	 */
	logWarning(message: string, args?: { [key: string]: any }, error?: Error);

	/**
	 * Write an information log entry.
	 * @param message
	 * @param args
	 * @param error
	 */
	logInformation(message: string, args?: { [key: string]: any }, error?: Error);

	/**
	 * Write a debug log entry.
	 * @param message
	 * @param args
	 * @param error
	 */
	logDebug(message: string, args?: { [key: string]: any }, error?: Error);

	/**
	 * Write a trace log entry.
	 * @param message
	 * @param args
	 * @param error
	 */
	logTrace(message: string, args?: { [key: string]: any }, error?: Error);
}