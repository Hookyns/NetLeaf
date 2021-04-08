import {PhysicalFileProvider} from "@netleaf/extensions-file-provider/src/PhysicalFileProvider"

(async () => {
	const provider = new PhysicalFileProvider(__dirname);
	console.log(await provider.getFileInfo("configs/appsetting.json"));
})();

// import { ConfigurationBuilder, IConfiguration, IConfigurationBuilder } from "@netleaf/extensions-configuration";
//
// const configBuilder: IConfigurationBuilder = new ConfigurationBuilder()
// 	.addJsonFile("appsetting.json")
// 	.addJsFile("appsetting.js");

// const configuration: IConfiguration = configBuilder.build();
