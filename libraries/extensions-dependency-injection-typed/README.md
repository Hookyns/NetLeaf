# @NetLeaf/dependency-injection-abstract

> Dependency Injection extension for NetLeaf application host framework based on `tst-reflection-transformer` and inspired by .NET.

*To proper use of this package, you need [ttypescript](https://github.com/cevek/ttypescript) and [tst-reflect](https://github.com/Hookyns/ts-reflection). Watch `tst-reflect` respository for more information.*

## Usage

Some services:
```typescript
import { IServiceProvider } from "@netleaf/extensions-dependency-injection-abstract";

interface ITextFormatter
{
    format(text: string);
}

class SpaceColorFormatter implements ITextFormatter
{
    format(text: string)
    {
        return "> " + text;
    }
}

interface ILogger
{
    info(message: string);
}

class ConsoleLogger implements ILogger
{
    private readonly console: Console;

    constructor(private formatter: ITextFormatter, serviceProvider: IServiceProvider)
    {
        this.console = serviceProvider.getService("console");
    }

    info(message: string)
    {
        this.console.info(this.formatter.format(message));
    }
}
```

Usage:
```typescript
import { TypedServiceCollection, TypedServiceProvider } from "@netleaf/extensions-dependency-injection-typed";

// Create service collection
const serviceCollection = new TypedServiceCollection();

// Add services into the collection
serviceCollection.addTransient<ILogger, ConsoleLogger>();
serviceCollection.addSingleton<ITextFormatter, SpaceColorFormatter>();
serviceCollection.addSingleton("console", console);
serviceCollection.addSingleton("app.config", { someObject: { eg: "config" } });

// Create ServiceProvider from the ServiceCollection
const serviceProvider = new TypedServiceProvider(serviceCollection);

// Get instance of the ILogger
const logger: ILogger = serviceProvider.getService<ILogger>();

// Get app config
const config = serviceProvider.getService("app.config");

logger.info("Hello World!");
logger.info(JSON.stringify(config));
```

Output:
```
> Hello World!
> {"someObject":{"eg":"config"}}
```

## Lifetimes
Services can be registered with one of the following lifetimes:
- transient,
- scoped,
- singleton.

### Transient
Services registered with `transient` lifetime are created each time they're requested from the service provider. 
This lifetime works best for lightweight, stateless services.

Register transient services with `addTransient()`.

### Scoped
Services registered with `scoped` lifetime are created only once per scope. It is similar to a singleton inside one scope.

Register transient services with `addScoped()`.

Create new scope with `serviceProvider.createScope()`;

**Example**
```typescript
// Create service collection
const serviceCollection = new TypedServiceCollection();

// Add "service" into the collection
let scopedId = 0;
serviceCollection.addScoped("scopedId", provider => ++scopedId);

const serviceProvider = new TypedServiceProvider(serviceCollection);

console.log(serviceProvider.getService("scopedId")); // > 1
console.log(serviceProvider.getService("scopedId")); // > 1

const scope1 = serviceProvider.createScope();
console.log(scope1.serviceProvider.getService("scopedId")); // > 2
console.log(scope1.serviceProvider.getService("scopedId")); // > 2

const scope2 = serviceProvider.createScope();
console.log(scope2.serviceProvider.getService("scopedId")); // > 3
console.log(scope2.serviceProvider.getService("scopedId")); // > 3

console.log(serviceProvider.getService("scopedId")); // > 1
console.log(serviceProvider.getService("scopedId")); // > 1
```

### Singleton
Services registered with `scoped` lifetime are created only once. 
Single instance is used for whole application. 
Same instance is returned each time it is requested from the service provider, through all scopes.

Register transient services with `addSingleton()`.