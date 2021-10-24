import {
    IServiceProvider,
    IServiceScope
}                            from "@netleaf/extensions-dependency-injection-abstract";
import { ServiceDescriptor } from "../../extensions-dependency-injection-abstract/src";

export class ServiceScope implements IServiceScope
{
    private readonly _serviceProvider: IServiceProvider;
    private readonly _instances = new Map<ServiceDescriptor, any>();

    /**
     * Instance of corresponding ServiceProvider.
     * @return {IServiceProvider}
     */
    public get serviceProvider(): IServiceProvider
    {
        return this._serviceProvider;
    }

    /**
     * Map of existing instances.
     * @return {Map<ServiceDescriptor, any>}
     */
    public get instances(): Map<ServiceDescriptor, any>
    {
        return this._instances;
    }

    constructor(serviceProvider: IServiceProvider)
    {
        this._serviceProvider = serviceProvider;
    }

    /**
     * Store instance in the scope.
     * @param {string} serviceDescriptor
     * @param instance
     */
    public addInstance(serviceDescriptor: ServiceDescriptor, instance: any): void
    {
        this._instances.set(serviceDescriptor, instance);
    }
}