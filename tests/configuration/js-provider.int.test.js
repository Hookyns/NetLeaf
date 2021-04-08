"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const JsConfigurationProvider_1 = require("../../libraries/extensions-configuration/src/providers/JsConfigurationProvider");
const path = require("path");
// General tests
const configProvider = new JsConfigurationProvider_1.default(path.join(__dirname, "files", "config.js"));
test("get() before load() throws", () => {
    expect(() => configProvider.get("")).toThrow(/loaded/);
});
test("load() finish without error", () => {
    expect(async () => await configProvider.load()).not.toThrow();
});
test("get() without key throws", async () => {
    await configProvider.load();
    expect(() => configProvider.get("")).toThrow(/argument/i);
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
const wrongConfigProvider = new JsConfigurationProvider_1.default(path.join(__dirname, "files", "config-wrong.js"));
test("load() throws when config return something else than plain JS object.", async () => {
    expect.assertions(1);
    try {
        await wrongConfigProvider.load();
    }
    catch (ex) {
        expect(ex.message).toMatch(/plain JS object/i);
    }
});
// Async config tests
const asyncConfigProvider = new JsConfigurationProvider_1.default(path.join(__dirname, "files", "config-async.js"));
test("load() of async config finish without error", () => {
    expect(async () => await asyncConfigProvider.load()).not.toThrow();
});
test("get('foo') of async config return correct value", async () => {
    await asyncConfigProvider.load();
    expect(asyncConfigProvider.get("foo")).toContain("ipsum");
});
// Default export config tests
const defaultExportConfigProvider = new JsConfigurationProvider_1.default(path.join(__dirname, "files", "config-default-export.js"));
test("load() of config with default export finish without error", () => {
    expect(async () => await defaultExportConfigProvider.load()).not.toThrow();
});
test("get('foo') of config with default export return correct value", async () => {
    await defaultExportConfigProvider.load();
    expect(defaultExportConfigProvider.get("foo")).toContain("ipsum");
});
//# sourceMappingURL=js-provider.int.test.js.map