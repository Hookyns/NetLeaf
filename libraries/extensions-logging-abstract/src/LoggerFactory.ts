import {reflectGeneric} from "tst-reflect"

export default abstract class LoggerFactory
{
	/**
	 * 
	 * @param categoryName
	 */
	@reflectGeneric()
	createLogger<TCategory>(categoryName: string) {
		
	}
}