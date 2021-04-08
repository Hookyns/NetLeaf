"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PhysicalFileProvider_1 = require("@netleaf/extensions-file-provider/src/PhysicalFileProvider");
(async () => {
    const provider = new PhysicalFileProvider_1.PhysicalFileProvider(__dirname);
    console.log(await provider.getFileInfo("configs/appsetting.json"));
})();
// import { ConfigurationBuilder, IConfiguration, IConfigurationBuilder } from "@netleaf/extensions-configuration";
//
// const configBuilder: IConfigurationBuilder = new ConfigurationBuilder()
// 	.addJsonFile("appsetting.json")
// 	.addJsFile("appsetting.js");
// const configuration: IConfiguration = configBuilder.build();
//# sourceMappingURL=index.js.map