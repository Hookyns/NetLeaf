// import { IFileProvider, PhysicalFileProvider } from "@netleaf/extensions-file-provider";

// (async () => {
// 	const provider: IFileProvider = new PhysicalFileProvider("../");
// 	console.log(await provider.getFileInfo("configs/appsetting.json"));
// })();

import { ConfigurationBuilder, IConfigurationBuilder, IRootConfiguration } from "@netleaf/extensions-configuration";
import * as path                                                           from "path";

(async () => {
	const configBuilder: IConfigurationBuilder = new ConfigurationBuilder()
		.addJsonFile("appsetting.json")
		.addJsFile("appsetting.js")
		.setRootDirectory(path.join(__dirname, "configs"));

	const configuration: IRootConfiguration = await configBuilder.build();
	
	console.table(configuration.getSection("logging").value);

	const serverOptions = configuration.getSection("server");

	console.table(serverOptions.value);
	console.log(serverOptions.get("host") + ":" + serverOptions.get("port"));
})();
