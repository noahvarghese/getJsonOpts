import isObj from "./isObj";

describe("valid", () => {
    const cases = [{}, { test: {} }, { test: "123" }];
    test.each(cases)("%p", (o) => {
        expect(isObj(o)).toBe(true);
    });
});

describe("invalid", () => {
    const cases = [undefined, null, "", " ", "123", 123, NaN, Symbol("foo")];
    test.each(cases)("%p", (o) => {
        expect(isObj(o)).toBe(false);
    });
});
