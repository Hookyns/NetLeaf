import {
    IServiceCollection,
    IServiceProvider,
    Lifetime,
    ServiceCollectionEntry,
    ServiceDescriptor,
    ServiceFactory
}                              from "@netleaf/extensions-dependency-injection-abstract";
import {
    getType,
    Type
}                              from "tst-reflect";
import {
    isIServiceCollection,
    isServiceCollectionEntry,
    isServiceDescriptor
} from "./guards";

/**
 * Service collection working with Type instances. Based on tst-reflect-transformer.
 */
export class TypedServiceCollection implements IServiceCollection
{
    /**
     * List of all added services.
     */
    private readonly _services: Map<string, ServiceCollectionEntry> = new Map<string, ServiceCollectionEntry>();

    /**
     * Iterator with all added service entries.
     */
    public get services(): IterableIterator<ServiceCollectionEntry>
    {
        return this._services.values();
    }

    /**
     * Add dependency into the collection.
     * @param entry
     */
    public add(entry: ServiceDescriptor | ServiceCollectionEntry): IServiceCollection;
    /**
     * Add dependencies from another collection.
     * @param collection
     */
    public add(collection: IServiceCollection): IServiceCollection;
    public add(entry: ServiceDescriptor | ServiceCollectionEntry | IServiceCollection): IServiceCollection
    {
        if (isServiceDescriptor(entry))
        {
            this.addServiceDescriptor(entry);
        }
        else if (isServiceCollectionEntry(entry))
        {
            for (let descriptor of entry.descriptors)
            {
                this.addServiceDescriptor(descriptor);
            }
        }
        else if (isIServiceCollection(entry))
        {
            for (let collection of entry.services)
            {
                for (let descriptor of collection.descriptors)
                {
                    this.addServiceDescriptor(descriptor);
                }
            }
        }

        return this;
    }

    /**
     * Add scoped dependency into the collection.
     * @reflectGeneric
     */
    public addScoped<TService, TImplementation>(): IServiceCollection;
    /**
     * Add scoped dependency into the collection.
     * @reflectGeneric
     * @param factory
     */
    public addScoped<TService>(factory: ServiceFactory): IServiceCollection;
    /**
     * Add scoped dependency into the collection.
     * @param serviceType
     * @param implementation
     */
    public addScoped(serviceType: Type, implementation: Type): IServiceCollection;
    /**
     * Add scoped dependency into the collection.
     * @param serviceType
     * @param factory
     */
    public addScoped(serviceType: Type, factory: ServiceFactory): IServiceCollection;
    /**
     * Add scoped dependency into the collection.
     * @param serviceIdentifier
     * @param implementation
     */
    public addScoped(serviceIdentifier: string, implementation: Type): IServiceCollection;
    /**
     * Add scoped dependency into the collection.
     * @param serviceIdentifier
     * @param factory
     */
    public addScoped(serviceIdentifier: string, factory: ServiceFactory): IServiceCollection;
    public addScoped<TService, TImplementation>(a?: any, b?: any): IServiceCollection
    {
        this.addServiceDescriptorFromArguments(a, b, Lifetime.Scoped, getType<TService>(), getType<TImplementation>());
        return this;
    }

    /**
     * Add singleton dependency into the collection.
     * @reflectGeneric
     */
    public addSingleton<TService, TImplementation>(): IServiceCollection;
    /**
     * Add singleton dependency into the collection.
     * @reflectGeneric
     * @param instance
     */
    public addSingleton<TService>(instance: any): IServiceCollection;
    /**
     * Add singleton dependency into the collection.
     * @reflectGeneric
     * @param factory
     */
    public addSingleton<TService>(factory: ServiceFactory): IServiceCollection;
    /**
     * Add singleton dependency into the collection.
     * @param serviceType
     * @param implementation
     */
    public addSingleton(serviceType: Type, implementation: Type): IServiceCollection;
    /**
     * Add singleton dependency into the collection.
     * @param serviceType
     * @param instance
     */
    public addSingleton(serviceType: Type, instance: any): IServiceCollection;
    /**
     * Add singleton dependency into the collection.
     * @param serviceType
     * @param factory
     */
    public addSingleton(serviceType: Type, factory: ServiceFactory): IServiceCollection;
    /**
     * Add singleton dependency into the collection.
     * @param serviceType
     * @param implementation
     */
    public addSingleton(serviceType: string, implementation: Type): IServiceCollection;
    /**
     * Add singleton dependency into the collection.
     * @param serviceType
     * @param instance
     */
    public addSingleton(serviceType: string, instance: any): IServiceCollection;
    /**
     * Add singleton dependency into the collection.
     * @param serviceType
     * @param factory
     */
    public addSingleton(serviceType: string, factory: ServiceFactory): IServiceCollection;
    /**
     * @reflectGeneric
     * @param a
     * @param b
     * @return {IServiceCollection}
     */
    public addSingleton<TService, TImplementation>(a?: any, b?: any): IServiceCollection
    {
        this.addServiceDescriptorFromArguments(a, b, Lifetime.Singleton, getType<TService>(), getType<TImplementation>());
        return this;
    }

    /**
     * Add transient dependency into the collection.
     * @reflectGeneric
     */
    public addTransient<TService, TImplementation>(): IServiceCollection;
    /**
     * Add transient dependency into the collection.
     * @reflectGeneric
     * @param factory
     */
    public addTransient<TService>(factory: ServiceFactory): IServiceCollection;
    /**
     * Add transient dependency into the collection.
     * @param serviceType
     * @param implementation
     */
    public addTransient(serviceType: Type, implementation: Type): IServiceCollection;
    /**
     * Add transient dependency into the collection.
     * @param serviceType
     * @param factory
     */
    public addTransient(serviceType: Type, factory: ServiceFactory): IServiceCollection;
    /**
     * Add transient dependency into the collection.
     * @param serviceType
     * @param implementation
     */
    public addTransient(serviceType: string, implementation: Type): IServiceCollection;
    /**
     * Add transient dependency into the collection.
     * @param serviceType
     * @param factory
     */
    public addTransient(serviceType: string, factory: ServiceFactory): IServiceCollection;
    public addTransient<TService, TImplementation>(a?: any, b?: any): IServiceCollection
    {
        this.addServiceDescriptorFromArguments(a, b, Lifetime.Transient, getType<TService>(), getType<TImplementation>());
        return this;
    }

    /**
     * Resolves instance of implementation via Type.
     * @param {IServiceProvider} provider
     * @param {Type} impl
     * @private
     */
    private static resolveType(provider: IServiceProvider, impl: Type)
    {
        if (!impl.ctor) throw new Error(`Unable to construct type '${impl.fullName}'. Type contains no reference to the ctor.`);

        const constructors = impl.getConstructors();

        if (!constructors?.length)
        {
            return Reflect.construct(impl.ctor, []);
        }

        // Ctor with less parameters preferred
        const constructor = constructors.sort((a, b) => a.parameters.length > b.parameters.length ? 1 : 0)[0];

        // Resolve parameters
        const args = constructor.parameters.map(param => {
            const service = provider.getServices(param.type)[Symbol.iterator]().next().value;

            if (service === undefined)
            {
                if (param.optional)
                {
                    return undefined;
                }

                throw new Error(`Error while construction of type '${impl.fullName}'. Unable to resolve constructor parameter '${param.name}'.`
                    + `Type of parameter '${param.type.fullName}' cannot be resolved and parameter is not optional.`);
            }

            return service;
        });

        return Reflect.construct(impl.ctor, args);
    }

    /**
     * Returns ServiceFactory for given implementation Type.
     * @param {Type} implementation
     * @return {ServiceFactory}
     * @private
     */
    private static getTypeFactory(implementation: Type): ServiceFactory
    {
        return provider => TypedServiceCollection.resolveType(provider, implementation);
    }

    /**
     * Returns descriptor for given parameters.
     * @param {string} serviceIdentifier
     * @param implementation
     * @param {Lifetime} lifetime
     * @return {ServiceDescriptor}
     * @private
     */
    private static getServiceDescriptor(serviceIdentifier: string, implementation: any, lifetime: Lifetime): ServiceDescriptor
    {
        if (Object.getPrototypeOf(implementation.constructor).name == "Type")
        {
            return {
                serviceIdentifier: serviceIdentifier,
                lifetime: lifetime,
                implementationFactory: TypedServiceCollection.getTypeFactory(implementation)
            };
        }

        if (typeof implementation == "function")
        {
            return {
                serviceIdentifier: serviceIdentifier,
                lifetime: lifetime,
                implementationFactory: implementation
            };
        }

        return {
            serviceIdentifier: serviceIdentifier,
            lifetime: lifetime,
            implementationValue: implementation
        };
    }

    /**
     * Adds ServiceDescriptor into the collection.
     * @param {ServiceDescriptor} descriptor
     * @private
     */
    private addServiceDescriptor(descriptor: ServiceDescriptor)
    {
        let entry: ServiceCollectionEntry | undefined = this._services.get(descriptor.serviceIdentifier);

        if (!entry)
        {
            entry = {
                serviceIdentifier: descriptor.serviceIdentifier,
                descriptors: []
            };

            this._services.set(descriptor.serviceIdentifier, entry);
        }

        entry.descriptors.push(descriptor);
    }

    /**
     * @param a
     * @param b
     * @param {Lifetime} lifetime
     * @param {Type} TService
     * @param {Type} TImplementation
     * @private
     */
    private addServiceDescriptorFromArguments(a: any, b: any, lifetime: Lifetime, TService?: Type, TImplementation?: Type)
    {
        let serviceIdentifier: string;
        let implementation: any = b;

        // No arguments, use generic arguments
        if (a === undefined)
        {
            const serviceType = TService;
            const implementationType = TImplementation;

            if (!serviceType) throw new Error("No service specified.");
            if (!implementationType) throw new Error("No implementation specified.");

            serviceIdentifier = serviceType.fullName;
            implementation = implementationType;
        }
        // No second argument, use first generic argument as service and first argument as value
        else if (b === undefined)
        {
            const serviceType = TService;
            if (!serviceType) throw new Error("No service specified.");

            serviceIdentifier = serviceType.fullName;
            implementation = a;
        }
        // both arguments set
        else
        {
            serviceIdentifier = Object.getPrototypeOf(implementation.constructor).name == "Type" ? a.fullName : a;
            implementation = b;
        }

        this.addServiceDescriptor(
            TypedServiceCollection.getServiceDescriptor(serviceIdentifier, implementation, Lifetime.Scoped)
        );
    }
}