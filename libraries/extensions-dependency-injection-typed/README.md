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