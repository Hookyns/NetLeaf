import {
    IServiceCollection,
    IServiceProvider,
    IServiceScope,
    ServiceCollectionEntry,
    ServiceDescriptor
}                                 from "@netleaf/extensions-dependency-injection-abstract";
import {
    getType,
    Type
}                                 from "tst-reflect";
import { Lifetime }               from "../../extensions-dependency-injection-abstract/src";
import { isServiceDescriptor }    from "./guards";
import { ServiceScope }           from "./ServiceScope";
import { TypedServiceCollection } from "./TypedServiceCollection";

const ServiceProviderIdentifier = getType<IServiceProvider>()?.fullName ?? "__IServiceProvider__";

export class TypedServiceProvider implements IServiceProvider
{
    /**
     * Service collection
     */
    private readonly _serviceCollection: IServiceCollection;

    /**
     * Instance of the ROOT service provider.
     * @type {TypedServiceProvider}
     * @private
     */
    private readonly _rootServiceProvider?: TypedServiceProvider;

    /**
     * Scope of this provider.
     * @type {ServiceScope}
     * @private
     */
    private readonly _scope: ServiceScope;

    /**
     * Create service provider on top of service collection.
     * @param serviceCollection
     */
    constructor(serviceCollection: IServiceCollection)
    /**
     * @internal
     * @param {IServiceCollection} serviceCollection
     * @param rootServiceProvider
     */
    constructor(serviceCollection: IServiceCollection, rootServiceProvider: TypedServiceProvider)
    constructor(serviceCollection: IServiceCollection, rootServiceProvider?: TypedServiceProvider)
    {
        this._rootServiceProvider = rootServiceProvider;
        this._scope = new ServiceScope(this);

        // Create own clone of the collection
        this._serviceCollection = new TypedServiceCollection();
        this._serviceCollection.add(serviceCollection);

        // Register this instance of service provider as IServiceProvider implementation for itself.
        this._serviceCollection.add({ serviceIdentifier: ServiceProviderIdentifier, lifetime: Lifetime.Scoped, implementationValue: this });
    }

    /**
     * Resolve and return Iterable with instances of all registered implementations for the service.
     * @reflectGeneric
     */
    public getServices<TService>(): Iterable<TService>;
    /**
     * Resolve and return Iterable with instances of all registered implementations for the service.
     * @param type
     */
    public getServices<TService>(type: Type): Iterable<TService>;
    /**
     * Resolve and return Iterable with instances of all registered implementations for the service.
     * @param serviceIdentifier
     */
    public getServices<TService>(serviceIdentifier: string): Iterable<TService>;
    public getServices<TService>(type?: Type | string): Iterable<TService>
    {
        const entry: ServiceCollectionEntry = this.getEntry(type ?? getType<TService>());
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

    /**
     * Resolve and return instance of last registered implementation of the service.
     * @reflectGeneric
     */
    public getService<TService>(): TService;
    /**
     * Resolve and return instance of last registered implementation of the service.
     * @param type
     */
    public getService<TService>(type: Type): TService;
    /**
     * Resolve and return instance of last registered implementation of the service.
     * @param serviceIdentifier
     */
    public getService<TService>(serviceIdentifier: string): TService;
    /**
     * Resolve and return instance of last registered implementation of the service.
     * @internal
     * @param {ServiceDescriptor} serviceDescriptor
     * @return {TService}
     */
    public getService<TService>(serviceDescriptor: ServiceDescriptor): TService;
    public getService<TService>(type?: Type | string | ServiceDescriptor): TService
    {
        if (isServiceDescriptor(type))
        {
            return this.resolveDescriptor(type);
        }

        const entry: ServiceCollectionEntry = this.getEntry(type ?? getType<TService>());

        // Taking last descriptor (it overrides all implementations registered earlier).
        const lastDescriptor = entry.descriptors[entry.descriptors.length - 1];

        return this.resolveDescriptor(lastDescriptor);
    }

    /**
     * Creates new service scope.
     * @return {IServiceScope}
     */
    public createScope(): IServiceScope
    {
        // New provider
        const provider = new TypedServiceProvider(this._serviceCollection, this._rootServiceProvider ?? this);

        // Return scope of the new provider
        return provider._scope;
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
            if (descriptor.lifetime == Lifetime.Transient)
            {
                return descriptor.implementationFactory(this);
            }

            if (descriptor.lifetime == Lifetime.Scoped)
            {
                let scopedInstance = this._scope.instances.get(descriptor);

                if (scopedInstance == undefined)
                {
                    scopedInstance = descriptor.implementationFactory(this);
                    this._scope.addInstance(descriptor, scopedInstance);
                }

                return scopedInstance;
            }

            if (descriptor.lifetime == Lifetime.Singleton)
            {
                if (!this._rootServiceProvider)
                {
                    let singletonInstance = this._scope.instances.get(descriptor);

                    if (singletonInstance == undefined)
                    {
                        singletonInstance = descriptor.implementationFactory(this);
                        this._scope.addInstance(descriptor, singletonInstance);
                    }

                    return singletonInstance;
                }

                return this._rootServiceProvider.getService(descriptor);
            }

            throw new Error(`Lifetime ${Lifetime[descriptor.lifetime]} support not implemented.`);
        }
        else
        {
            return descriptor.implementationValue;
        }
    }
}