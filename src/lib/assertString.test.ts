import assertString from "./assertString";

describe("non string", () => {
    const cases = [
        { val: 123 },
        { val: null },
        { val: undefined },
        { val: true },
        { val: {} },
        {
            val: () => {
                return;
            },
        },
    ];

    test.each(cases)("%p", ({ val }) => {
        let errorThrown = false;

        try {
            assertString(val);
        } catch (_) {
            errorThrown = true;
        }

        expect(errorThrown).toBe(true);
    });
});

describe("string values", () => {
    const cases = [{ val: "" }, { val: " " }, { val: "string" }];

    test.each(cases)("%p", ({ val }) => {
        let errorThrown = false;

        try {
            assertString(val);
        } catch (_) {
            errorThrown = true;
        }

        expect(errorThrown).toBe(false);
    });
});
