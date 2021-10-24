import { IServiceProvider } from "./IServiceProvider";

export interface IServiceScope
{
    /**
     * Instance of corresponding ServiceProvider.
     * @return {IServiceProvider}
     */
    readonly serviceProvider: IServiceProvider;
}