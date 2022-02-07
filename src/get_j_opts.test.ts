import getJOpts, { TypeKey } from "./index";

test("temp test for format options", () => {
    let errorThrown = false;
    try {
        getJOpts(
            { email: "doesnt matter" },
            { email: { required: false, type: "string", format: "yolo" } }
        );
    } catch (_e) {
        errorThrown = true;
        const { message } = _e as Error;
        expect(message).toBe("format checker not implemented");
    }
    expect(errorThrown).toBe(true);
});

test("temp test for format options", () => {
    let errorThrown = false;
    try {
        getJOpts(
            { email: "doesnt matter" },
            { email: { required: false, type: "string", format: "yolo" } },
            {
                yolo: () => {
                    return false;
                },
            }
        );
    } catch (_e) {
        errorThrown = true;
        const { message } = _e as Error;
        expect(message).toBe("format options not implemented");
    }
    expect(errorThrown).toBe(true);
});

test("invalid type", () => {
    let errorThrown = false;
    try {
        getJOpts(
            { email: "doesnt matter" },
            {
                email: {
                    required: false,
                    type: "yolo" as TypeKey,
                },
            }
        );
    } catch (_e) {
        errorThrown = true;
        const { message } = _e as Error;
        expect(message).toBe("type yolo not found");
    }
    expect(errorThrown).toBe(true);
});

describe("without formatter", () => {
    const cases = [
        {
            name: "name",
            type: "string",
            required: true,
            value: "",
            errorExpected: true,
        },
        {
            name: "name",
            type: "string",
            required: true,
            value: "test",
            errorExpected: false,
        },
        {
            name: "name",
            type: "string",
            required: false,
            value: "",
            errorExpected: false,
        },
        {
            name: "name",
            type: "string",
            required: false,
            value: "test",
            errorExpected: false,
        },
    ];

    test.each(cases)("%p", ({ name, type, required, value, errorExpected }) => {
        let errorThrown = false;
        let body;

        try {
            body = getJOpts(
                { [name]: value },
                { [name]: { required, type: type as TypeKey } }
            );
        } catch (_e) {
            errorThrown = true;
        }

        expect(errorThrown).toBe(errorExpected);

        if (!errorExpected && !errorThrown) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            expect((body as any)[name]).toBe(value ? value : undefined);
        }
    });
});
