import { ConsoleConfigurationProvider } from "../../libraries/extensions-configuration/src/providers/ConsoleConfigurationProvider";

const configProvider = new ConsoleConfigurationProvider(["some", "params", "-p", "tsconfig.json", "--coverage", "-abc", "--number", "5"]);

test("get() before load() throws", () => {
	expect(() => new ConsoleConfigurationProvider([]).get("")).toThrow(/loaded/);
});

test("load() finish without error", () => {
	expect(async () => await configProvider.load()).not.toThrow();
});

test("get() without key returns whole configuration object", async () => {
	await configProvider.load();
	expect(Object.keys(configProvider.get(""))).toEqual(["_", "p", "coverage", "a", "b", "c", "number"]);
});

test("get() not existing key return 'undefined'", async () => {
	await configProvider.load();
	expect(configProvider.get("some non-existing key")).toBe(undefined);
});

test("get('number') return correct value", async () => {
	await configProvider.load();
	expect(configProvider.get("number")).toBe(5);
});