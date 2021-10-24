import { IServiceProvider }       from "@netleaf/extensions-dependency-injection-abstract";
import {
    TypedServiceCollection,
    TypedServiceProvider
} from "@netleaf/extensions-dependency-injection-typed";

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

const serviceCollection = new TypedServiceCollection();

let scopedId = 0;
serviceCollection.addScoped("scopedId", provider => ++scopedId);
serviceCollection.addTransient<ILogger, ConsoleLogger>();
serviceCollection.addSingleton<ITextFormatter, SpaceColorFormatter>();

serviceCollection.addSingleton("console", console);
serviceCollection.addSingleton("app.config", { someObject: { eg: "config" } });

const serviceProvider = new TypedServiceProvider(serviceCollection);

const logger: ILogger = serviceProvider.getService<ILogger>();
const config = serviceProvider.getService("app.config");

logger.info("Hello World!");
logger.info(JSON.stringify(config));


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