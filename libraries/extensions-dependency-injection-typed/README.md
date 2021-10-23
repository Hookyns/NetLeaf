# @NetLeaf/dependency-injection-abstract

> Dependency Injection extension for NetLeaf application host framework based on `tst-reflection-transformer` and inspired by .NET.

*To proper use of this package, you need [ttypescript](https://github.com/cevek/ttypescript) and [tst-reflect](https://github.com/Hookyns/ts-reflection). Watch `tst-reflect` respository for more information.*

## Usage
```typescript
import {
    TypedServiceCollection,
    TypedServiceProvider
} from "@netleaf/extensions-dependency-injection-abstract-typed";

const serviceCollection = new TypedServiceCollection();

serviceCollection.addTransient<ILogger, ConsoleLogger>();
serviceCollection.addSingleton<ITextFormatter, SpaceColorFormatter>();
serviceCollection.addScoped<ICache, MemoryCache>();

serviceCollection.addSingleton<Console>(console);
serviceCollection.addSingleton("SomeStringIdentifier", { someObject: { eg: "config" } });

const serviceProvider = new TypedServiceProvider(serviceCollection);

const logger: ILogger = serviceProvider.getService<ILogger>();
logger.info("Hello World!");

console.log(serviceProvider.getService("SomeStringIdentifier")); // > { someObject: { eg: "config" } }
```

```typescript
interface ITextFormatter {
    format(text: string);
}

class SpaceColorFormatter implements ITextFormatter {
    format(text: string) {
        // ...
        return text;
    }
}

interface ILogger {
    info(message: string);
}

class ConsoleLogger implements ILogger {
    constructor(private console: Console, private formatter: ITextFormatter) {}

    info(message: string) {
        this.console.info(this.formatter.format(message));
    }
}
```

## Known Issues
* Lifetime scopes are not implemented yet. All services are handled like Transient.