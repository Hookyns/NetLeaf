import {
    IServiceCollection,
    IServiceProvider
} from "../../libraries/extensions-dependency-injection-abstract/dist";
import {
    TypedServiceCollection,
    TypedServiceProvider
}                             from "../../libraries/extensions-dependency-injection-typed/dist";

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

const serviceCollection: IServiceCollection = new TypedServiceCollection();

serviceCollection.addTransient<ILogger, ConsoleLogger>();
serviceCollection.addSingleton<ITextFormatter, SpaceColorFormatter>();
// serviceCollection.addScoped<ICache, MemoryCache>();

serviceCollection.addSingleton<Console>(console);
serviceCollection.addSingleton("SomeStringIdentifier", { someObject: { eg: "config" } });

const serviceProvider: IServiceProvider = new TypedServiceProvider(serviceCollection);

const logger: ILogger = serviceProvider.getService<ILogger>();
logger.info("Hello World!");

console.log(serviceProvider.getService("SomeStringIdentifier")); // > { someObject: { eg: "config" } }