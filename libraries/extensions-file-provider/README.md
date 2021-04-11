# @NetLeaf/extensions-file-provider
> FileProvider extension for NetLeaf application host framework.

## Usage

```typescript
import { IFileProvider, PhysicalFileProvider } from "@netleaf/extensions-file-provider";

const fileProvider: IFileProvider = new PhysicalFileProvider(process.cwd());
const fileInfo = await fileProvider.getFileInfo("config.json");

if (fileInfo.exists && !fileInfo.isDirectory)
{
	const config = await import(fileInfo.path);
	console.log(fileInfo.name, config);
}
```