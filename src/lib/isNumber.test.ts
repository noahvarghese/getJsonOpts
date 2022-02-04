import isNumber from "./isNumber";

test("valid", () => {
    expect(isNumber(123)).toBe(true);
});

describe.skip("not a number", () => {
    const cases = ["", undefined, null, {}, Symbol("foo")];
    test.each(cases)("%p", (n) => {
        expect(isNumber(n)).toBe(false);
    });
});
