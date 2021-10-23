import {
    Type,
    getType
} from "tst-reflect";
import {
    IServiceCollection,
    IServiceProvider,
    ServiceCollectionEntry,
    ServiceDescriptor
} from "@netleaf/extensions-dependency-injection-abstract";

export class TypedServiceProvider implements IServiceProvider
{
    /**
     * Service collection
     */
    private readonly _serviceCollection: IServiceCollection;

    /**
     * Create service provider on top of service collection.
     * @param serviceCollection
     */
    constructor(serviceCollection: IServiceCollection)
    {
        this._serviceCollection = serviceCollection;
        
        // Register this instance of service provider as IServiceProvider implementation for itself.
        serviceCollection.addSingleton<IServiceProvider>(this);
    }

    getServices<TService>(): Iterable<TService>;
    getServices<TService>(type: Type): Iterable<TService>;
    getServices<TService>(serviceIdentifier: string): Iterable<TService>;
    getServices<TService>(type?: Type | string): Iterable<TService>
    {
        const entry: ServiceCollectionEntry = this.getEntry(type ?? getType<TService>())
        const self = this;

        return {
            [Symbol.iterator]: function* () {
                for (let descriptor of entry.descriptors)
                {
                    yield self.resolveDescriptor(descriptor);
                }
            }
        };
    }

    getService<TService>(): TService;
    getService<TService>(type: Type): TService;
    getService<TService>(serviceIdentifier: string): TService;
    getService<TService>(type?: Type | string): TService
    {
        const entry: ServiceCollectionEntry = this.getEntry(type ?? getType<TService>());
        
        // Taking last descriptor (it overrides all implementations registered earlier).
        const lastDescriptor = entry.descriptors[entry.descriptors.length - 1];
        
        return this.resolveDescriptor(lastDescriptor);
    }

    /**
     * Returns ServiceCollectionEntry for the service identification.
     * @param {Type | string} type
     * @return {ServiceCollectionEntry}
     * @private
     */
    private getEntry(type?: Type | string): ServiceCollectionEntry 
    {
        if (!type)
        {
            throw new Error("No service specified.");
        }

        const serviceIdentifier: string = typeof type == "string" ? type : type.fullName;
        const entry: ServiceCollectionEntry | undefined = Array.from(this._serviceCollection.services).find(entry => entry.serviceIdentifier == serviceIdentifier);

        if (!entry)
        {
            throw new Error(`No service '${serviceIdentifier}' registered.`);
        }
        
        return entry;
    }

    /**
     * Returns instance of service implementation.
     * @param {ServiceDescriptor} descriptor
     * @return {any}
     * @private
     */
    private resolveDescriptor(descriptor: ServiceDescriptor): any
    {
        if (typeof descriptor.implementationFactory == "function")
        {
            // TODO: Use Lifetime scopes
            return descriptor.implementationFactory(this);
        }
        else
        {
            return descriptor.implementationValue;
        }
    }
}