import IHostBuilder from "./IHostBuilder";
export default class Host {
    static CreateDefaultBuilder(): IHostBuilder;
    run(): Promise<void>;
}
