import IConfigurationBuilder from "./configuration/IConfigurationBuilder";
import Host from "./Host";
export default interface IHostBuilder {
    configureLogging(configurator: () => IConfigurationBuilder): IHostBuilder;
    configureHostConfiguration(configurator: () => IConfigurationBuilder): IHostBuilder;
    build(): Host;
}
