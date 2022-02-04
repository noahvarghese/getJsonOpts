import isEmpty from "./isEmpty";

describe("empty", () => {
    const cases = ["", " "];
    test.each(cases)("%p", (val) => {
        expect(isEmpty(val)).toBe(true);
    });
});

describe("types", () => {
    const cases = [Symbol(), "valid", 123, true, false, {}];
    test.each(cases)("%p", () => {
        expect(isEmpty("valid")).toBe(false);
    });
});
