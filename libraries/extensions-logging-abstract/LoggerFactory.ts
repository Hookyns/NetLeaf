export default abstract class LoggerFactory
{
	/**
	 * 
	 * @param categoryName
	 */
	createLogger<TCategory>(categoryName: string);
}