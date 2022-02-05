import isNumber from "./isNumber";

describe("valid", () => {
    const cases = [123];

    test.each(cases)("%p", (n) => {
        expect(isNumber(n)).toBe(true);
    });
});

describe("not a number", () => {
    const cases = [
        "",
        undefined,
        null,
        NaN,
        {},
        Symbol("foo"),
        false,
        true,
        " ",
        "test",
        { test: {} },
    ];

    test.each(cases)("%p", (n) => {
        expect(isNumber(n)).toBe(false);
    });
});
