import ILogger    from "./ILogger";
import {LogLevel} from "./LogLevel";

export default class NullLogger implements ILogger
{
	log(level: LogLevel, message: string, args?: { [p: string]: any }, error?: Error)
	{
	}

	logCritical(message: string, args?: { [p: string]: any }, error?: Error)
	{
	}

	logDebug(message: string, args?: { [p: string]: any }, error?: Error)
	{
	}

	logError(message: string, args?: { [p: string]: any }, error?: Error)
	{
	}

	logInformation(message: string, args?: { [p: string]: any }, error?: Error)
	{
	}

	logTrace(message: string, args?: { [p: string]: any }, error?: Error)
	{
	}

	logWarning(message: string, args?: { [p: string]: any }, error?: Error)
	{
	}

}