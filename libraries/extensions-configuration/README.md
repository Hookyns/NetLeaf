# @NetLeaf/extensions-configuration

> Configuration extension for NetLeaf application host framework.

```typescript
import { ConfigurationBuilder } from "@NetLeaf/extensions-configuration"

const configBuilder: IConfigurationBuilder = new ConfigurationBuilder()
	.addJsonFile("appsetting.json")
	.addJsFile("appsetting.js");

const configuration: IConfiguration = configBuilder.build();
```