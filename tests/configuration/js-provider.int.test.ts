import ConfigurationBuilderContext from "../../libraries/extensions-configuration/src/ConfigurationBuilderContext";
import JsConfigurationProvider     from "../../libraries/extensions-configuration/src/providers/JsConfigurationProvider";
import * as path                   from "path";
import { PhysicalFileProvider }    from "../../libraries/extensions-file-provider/src/index";

const context = new ConfigurationBuilderContext();
context.properties[ConfigurationBuilderContext.FileProviderPropertyKey] = new PhysicalFileProvider(path.join(__dirname, "files"));

const configProvider = new JsConfigurationProvider("config.js", context);

// General tests
test("get() before load() throws", () => {
	expect(() => configProvider.get("")).toThrow(/loaded/);
});

test("load() finish without error", () => {
	expect(async () => await configProvider.load()).not.toThrow();
});

test("get() without key returns whole configuration object", async () => {
	await configProvider.load();
	expect(Object.keys(configProvider.get(""))).toEqual(["foo", "bar"]);
});

test("get() not existing key return 'undefined'", async () => {
	await configProvider.load();
	expect(configProvider.get("some non-existing key")).toBe(undefined);
});

test("get('foo') return correct value", async () => {
	await configProvider.load();
	expect(configProvider.get("foo")).toContain("ipsum");
});

test("get('bar.baz') return correct nested value", async () => {
	await configProvider.load();
	expect(configProvider.get("bar.baz")).toBe("Lipsum");
});

// Wrong config
const wrongConfigProvider = new JsConfigurationProvider(path.join(__dirname, "files", "config-wrong.js"), context);

test("load() throws when config return something else than plain JS object.", async () => {
	expect.assertions(1);
	
	try
	{
		await wrongConfigProvider.load();
	}
	catch (ex)
	{
		expect(ex.message).toMatch(/plain JS object/i);
	}
});

// Async config tests
const asyncConfigProvider = new JsConfigurationProvider(path.join(__dirname, "files", "config-async.js"), context);

test("load() of async config finish without error", () => {
	expect(async () => await asyncConfigProvider.load()).not.toThrow();
});

test("get('foo') of async config return correct value", async () => {
	await asyncConfigProvider.load();
	expect(asyncConfigProvider.get("foo")).toContain("ipsum");
});

// Default export config tests
const defaultExportConfigProvider = new JsConfigurationProvider(path.join(__dirname, "files", "config-default-export.js"), context);

test("load() of config with default export finish without error", () => {
	expect(async () => await defaultExportConfigProvider.load()).not.toThrow();
});

test("get('foo') of config with default export return correct value", async () => {
	await defaultExportConfigProvider.load();
	expect(defaultExportConfigProvider.get("foo")).toContain("ipsum");
});