/**
 * Error class for wrapping caught errors with additional details.
 */
export default class ErrorWrap extends Error {
    #private;
    /**
     * Get inner Error object.
     */
    get innerError(): Error;
    /**
     * Construct error.
     * @param message
     * @param innerError
     */
    constructor(message: string, innerError: Error);
    /**
     * Get modified stack trace of error.
     * @param error
     * @param newMessage
     * @private
     */
    private static stackWithMessage;
}
