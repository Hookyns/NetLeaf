import * as path                from "path";
import { IRootConfiguration }   from "../../libraries/extensions-configuration/src";
import { ConfigurationBuilder } from "../../libraries/extensions-configuration/src";

test("ConfigurationBuilder.setRootDirectory creates FileProvider", () => {
	const builder = new ConfigurationBuilder().setRootDirectory(path.join(__dirname, "files"));
	
	expect(builder.context.getFileProvider()?.constructor.name).toBe("PhysicalFileProvider");
});

class Foo {}
type SomeConfigType = {
	foo: string,
	bar: {
		baz: string,
		nested: {
			value: boolean,
			number: number,
			cls: Foo
		}
	}
}

describe("Configuration builder test", () => {
	const builder = new ConfigurationBuilder()
		.setRootDirectory(path.join(__dirname, "files"))
		.addJsonFile("config.json")
		.addJsFile("config.js")
	;
	const configAwaiter = builder.build();
	let config: IRootConfiguration<SomeConfigType>;
	
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

	test("get() from section", async () => {
		expect(config.getSection("bar").get("nested")?.number).toBe(5);
		expect(config.getSection("barddsd").get("h")).toBe(undefined);
	});
});

describe("Configuration builder test - sync", () => {
	const builder = new ConfigurationBuilder()
		.setRootDirectory(path.join(__dirname, "files"))
		.addJsonFile("config.json", { synchronous: true }) // TODO: Remove this 'synchronous' option?! By using buildSync() vs build() we tell to use sync or async.
		.addJsFile("config.js", { synchronous: true })
	;
	let config: IRootConfiguration<SomeConfigType> = builder.buildSync();

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

	test("get() from section", async () => {
		expect(config.getSection("bar").get("nested")?.number).toBe(5);
		expect(config.getSection("barddsd").get("h")).toBe(undefined);
	});
});
