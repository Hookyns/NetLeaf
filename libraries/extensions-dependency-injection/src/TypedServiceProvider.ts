export class TypedServiceProvider
{
    /**
     * Get service instance
     * @reflectGeneric
     * @param type
     */
    getServices<TDependency>(type?: Type): Iterable<TDependency>
    {
        if (type === undefined)
        {
            type = getType<TDependency>();
        }

        const implementations = Array.from(this._serviceCollection.services).find(([dependency]) => type.is(dependency))?.[1];

        if (!implementations || !implementations.length)
        {
            throw new Error(`Type '${type.fullName}' is not registered.`);
        }

        const self = this;

        return {
            [Symbol.iterator]: function* () {
                let ctor, args;

                for (let impl of implementations)
                {
                    if (!impl.getConstructors()?.length)
                    {
                        yield Reflect.construct(impl.ctor, []);
                    }

                    // Ctor with less parameters preferred
                    ctor = impl.getConstructors()
                        .sort((a, b) => a.parameters.length > b.parameters.length ? 1 : 0)[0];

                    // Resolve parameters
                    args = ctor.parameters.map(param => self.getService(param.type));

                    yield Reflect.construct(impl.ctor, args);
                }
            }
        };
    }

    /**
     * Get service instance.
     * @reflectGeneric
     * @param type
     */
    getService<TDependency>(type?: Type): TDependency | null
    {
        return this.getServices(type ?? getType<TDependency>())[Symbol.iterator]().next().value || null;
    }
}