import isEmpty from "./isEmpty";

describe("invalid", () => {
    const cases = ["", " "];
    test.each(cases)("%p", (val) => {
        expect(isEmpty(val)).toBe(true);
    });
});

test("valid", () => {
    expect(isEmpty("valid")).toBe(false);
});
