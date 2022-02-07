import isUndefined from "./isUndefined";

test("empty is undefined", () => {
    expect(isUndefined()).toBe(true);
});

test("undefined is undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
});

describe("not undefined", () => {
    const cases = [
        "",
        " ",
        NaN,
        1,
        {},
        { test: "" },
        Symbol(),
        true,
        false,
        null,
    ];
    test.each(cases)("%p", (x) => {
        expect(isUndefined(x)).toBe(false);
    });
});
