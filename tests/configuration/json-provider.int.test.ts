import * as path                   from "path";
import ConfigurationBuilderContext from "../../libraries/extensions-configuration/src/ConfigurationBuilderContext";
import JsonConfigurationProvider   from "../../libraries/extensions-configuration/src/providers/JsonConfigurationProvider";

const configProvider = new JsonConfigurationProvider(path.join(__dirname, "files", "config.json"), new ConfigurationBuilderContext());

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