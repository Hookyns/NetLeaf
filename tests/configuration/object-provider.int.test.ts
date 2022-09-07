import { ObjectConfigurationProvider } from "../../libraries/extensions-configuration/src/providers/ObjectConfigurationProvider";

const configProvider = new ObjectConfigurationProvider({
	foo: "Lorem ipsum dolor sit amet",
	bar: {
		baz: "Lipsum JS",
		nested: {
			value: true,
			number: 5
		}
	}
});

test("get() before load() throws", () => {
	expect(() => new ObjectConfigurationProvider({}).get("")).toThrow(/loaded/);
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
	expect(configProvider.get("bar.baz")).toContain("Lipsum");
});