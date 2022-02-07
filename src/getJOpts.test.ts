import getJOpts, { TypeKey, ValidatorMap } from "./index";
import validator from "validator";

const fn = (v?: unknown) => validator.isEmail(v as string);

describe("valid format", () => {
    const cases = [
        {
            required: false,
            name: "email",
            type: "string",
            value: "test@test.com",
            fn,
        },
        {
            required: true,
            name: "email",
            type: "string",
            value: "test@test.com",
            fn,
        },
    ];

    test.each(cases)("%p", ({ name, required, type, fn, value }) => {
        const formats = [name] as const;
        type FormatKey = typeof formats[number];

        const formatValidators: ValidatorMap<FormatKey> = {
            [name]: fn,
        };

        let errorThrown = false;
        try {
            const body = getJOpts(
                { [name]: value },
                { [name]: { required, type: type as TypeKey, format: name } },
                formatValidators
            );

            expect(body[name]).toBe(value);
        } catch (_) {
            errorThrown = true;
        }
        expect(errorThrown).toBe(false);
    });
});

describe("invalid format", () => {
    const cases = [
        {
            required: false,
            name: "email",
            type: "string",
            value: "not an email",
            fn,
        },
        {
            required: true,
            name: "email",
            type: "string",
            value: "not an email",
            fn,
        },
    ];

    test.each(cases)("%p", ({ name, required, type, fn, value }) => {
        const formats = [name] as const;
        type FormatKey = typeof formats[number];

        const formatValidators: ValidatorMap<FormatKey> = {
            [name]: fn,
        };

        let errorThrown = false;
        try {
            getJOpts(
                { [name]: value },
                { [name]: { required, type: type as TypeKey, format: name } },
                formatValidators
            );
        } catch (_e) {
            errorThrown = true;
            const { message } = _e as Error;
            expect(message).toBe(`${name} format invalid -> ${value}`);
        }
        expect(errorThrown).toBe(true);
    });
});

test("format key doesnt match format options", () => {
    let errorThrown = false;
    try {
        getJOpts(
            { email: "doesnt matter" },
            { email: { required: false, type: "string", format: "yolo" } },
            { yolo: undefined as unknown as () => boolean }
        );
    } catch (_e) {
        errorThrown = true;
        const { message } = _e as Error;
        expect(message).toBe("yolo format checker not implemented");
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
