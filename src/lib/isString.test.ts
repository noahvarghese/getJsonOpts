import isString from "./isString";

describe("strings", () => {
    const cases = ["", " ", "test"];
    test.each(cases)("%p", (s) => {
        expect(isString(s)).toBe(true);
    });
});

describe("not strings", () => {
    const cases = [BigInt(1), Symbol(), 123, null, undefined, {}, { test: {} }];

    test.each(cases)("%p", (s) => {
        expect(isString(s)).toBe(false);
    });
});
