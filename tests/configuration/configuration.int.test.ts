import * as path                from "path";
import { IRootConfiguration }   from "../../libraries/extensions-configuration/src";
import { ConfigurationBuilder } from "../../libraries/extensions-configuration/src";

test("ConfigurationBuilder.setRootDirectory creates FileProvider", () => {
	const builder = new ConfigurationBuilder().setRootDirectory(path.join(__dirname, "files"));
	
	expect(builder.context.getFileProvider()?.constructor.name).toBe("PhysicalFileProvider");
});

describe("Configuration builder test", () => {
	const builder = new ConfigurationBuilder()
		.setRootDirectory(path.join(__dirname, "files"))
		.addJsonFile("config.json")
		.addJsFile("config.js")
	;
	const configAwaiter = builder.build();
	let config: IRootConfiguration;
	
	beforeAll(async() => {
		config = await configAwaiter;
	});

	test("getSections() returns correct top level configuration section.", async () => {
		expect(config.getSections().map(section => section.path)).toEqual(["foo", "bar"]);
	});
	
	test("getSection() with top level section name", async () => {
		expect(config.getSection("bar").value.baz).toContain("Lipsum");
	});
	
	test("getSection() with path", async () => {
		expect(config.getSection("bar.nested").get<number>("number")).toBe(5);
	});

	test("get() with path", async () => {
		expect(config.get("bar.baz")).toContain("Lipsum");
	});
});
