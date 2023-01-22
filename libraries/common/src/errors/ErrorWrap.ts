import { EOL as NewLine } from "os";

const EndOfLineRegex = /\r?\n/g;

/**
 * Error class for wrapping caught errors with additional details.
 */
export class ErrorWrap extends Error
{
	/**
	 * Inner error backing field.
	 * @private
	 */
	readonly #innerError: Error;

	// noinspection JSUnusedGlobalSymbols
	/**
	 * Get inner Error object.
	 */
	public get innerError(): Error
	{
		return this.#innerError;
	}

	/**
	 * Construct error.
	 * @param message
	 * @param innerError
	 */
	constructor(message: string, innerError: Error)
	{
		super(message);

		if (!innerError)
		{
			throw new Error("Argument 'innerError' cannot be falsy.");
		}

		this.#innerError = innerError;

		if (!this.stack)
		{
			Error.captureStackTrace(this, this.constructor);
		}

		const innerName = innerError.constructor.name ? " " + innerError.constructor.name : "";

		this.stack = this.stack
			+ NewLine
			+ ErrorWrap.stackWithMessage(innerError, `InnerError${innerName}: ${innerError.message}`);
	}

	/**
	 * Get modified stack trace of error.
	 * @param error
	 * @param newMessage
	 * @private
	 */
	private static stackWithMessage(error: Error, newMessage: string): string
	{
		const stack = error.stack || "";
		const match = error.message.match(EndOfLineRegex);
		const lines = match ? match.length + 1 : 1;

		return newMessage + NewLine
			+ stack.split(EndOfLineRegex).slice(lines).join(NewLine);
	}
}