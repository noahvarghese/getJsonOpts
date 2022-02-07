import isBoolean from "./isBoolean";

describe("valid", () => {
    const cases = [true, false];
    test.each(cases)("%p", (b) => {
        expect(isBoolean(b)).toBe(true);
    });
});

describe("invalid", () => {
    const cases = [
        undefined,
        null,
        "",
        " ",
        "123",
        123,
        {},
        { test: {} },
        NaN,
        Symbol("foo"),
    ];
    test.each(cases)("%p", (b) => {
        expect(isBoolean(b)).toBe(false);
    });
});
