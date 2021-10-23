import {
    IServiceCollection,
    IServiceProvider
} from "../../libraries/extensions-dependency-injection-abstract/dist";
import {
    TypedServiceCollection,
    TypedServiceProvider
}                             from "../../libraries/extensions-dependency-injection-typed/dist";


interface ILog
{
    log(...args: any[]);
}

class Log implements ILog
{
    private log1 = true;
    
    log(...args: any[])
    {
        console.log.apply(undefined, args);
    }
}

class Log2 implements ILog
{
    private log2 = true;
    
    log(...args: any[])
    {
        console.log.apply(undefined, args);
    }
}

interface IService
{
    doJob(number: number);
}

class Service implements IService
{
    private log: ILog;

    constructor(log: ILog)
    {
        this.log = log;
    }

    doJob(number: number)
    {
        const job = number + number;
        this.log.log(`${number} + ${number} = ${job}`);
    }
}

const serviceCollection: IServiceCollection = new TypedServiceCollection();
serviceCollection.addTransient<ILog, Log>();
serviceCollection.addTransient<ILog, Log2>();
serviceCollection.addTransient<IService, Service>();
serviceCollection.addSingleton("appport", 8080);

const serviceProvider: IServiceProvider = new TypedServiceProvider(serviceCollection);

const logger = serviceProvider.getService<ILog>();
const service = serviceProvider.getService<IService>();

logger.log("Type constructed using reflection: ", service);

if (service)
{
    service.doJob(Math.E);
}

console.log("All registered logs:", ...serviceProvider.getServices<ILog>());
console.log("Only one major log:", serviceProvider.getService<ILog>());

console.log("App port (registered value)", serviceProvider.getService("appport"));