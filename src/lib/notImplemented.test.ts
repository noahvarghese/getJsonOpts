import notImplemented from "./notImplemented";

describe("types", () => {
    const cases = [
        "",
        123,
        undefined,
        true,
        null,
        {},
        BigInt(1),
        Symbol("foo"),
    ];

    test.each(cases)("%p", (v) => {
        let errThrown = false;
        try {
            notImplemented(v);
        } catch (_e) {
            const { message } = _e as Error;
            errThrown = true;

            expect(message).toBe(
                `Validator for ${typeof v} type not implemented ${
                    typeof v === "symbol" ? v.description : v
                }`
            );
        }

        expect(errThrown).toBe(true);
    });
});
