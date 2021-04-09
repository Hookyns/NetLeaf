import * as path                from "path";
import { ConfigurationBuilder } from "../../libraries/extensions-configuration/dist";

test("Configuration builder test", async () => {

	const builder = new ConfigurationBuilder()
		.setRootDirectory(path.join(__dirname, "files"))
		.addJsonFile("config.json")
		.addJsFile("config.js")
	;

	const config = await builder.build();

	console.log(config.getSections());

	expect(true).toBe(true);
});