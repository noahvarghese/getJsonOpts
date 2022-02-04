import isEmpty from "./lib/isEmpty";
import Logs from "./util/logs";

type ValidatorMap<T extends string> = {
    [x in T]: {
        validator: (v?: unknown) => boolean;
    };
};

type TypeKey =
    | "string"
    | "number"
    | "undefined"
    | "boolean"
    | "object"
    | "function"
    | "bigint"
    | "symbol";

type TypeMap = ValidatorMap<TypeKey>;

type Expected<T extends string> = {
    [x: string]: {
        required: boolean;
        value: unknown;
        format?: T;
    };
};

const typeValidators: TypeMap = {
    string: {
        validator: (v: unknown) => !isEmpty(v as string),
    },
    number: {
        validator: (v: unknown) => !isNaN(Number(v)),
    },
    undefined: {
        validator: () => false,
    },
    boolean: {
        validator: (v: unknown) =>
            v !== undefined && (v === true || v === false),
    },
    function: {
        validator: (v: unknown) => {
            throw new Error(`Validator for function type not implemented ${v}`);
        },
    },
    object: {
        validator: (v: unknown) => {
            if (v === null) return false;
            const res =
                v &&
                Object.keys(v as Record<string, unknown>).length === 0 &&
                Object.getPrototypeOf(v) === Object.prototype;
            return !res;
        },
    },
    bigint: {
        validator: (v: unknown) => {
            throw new Error(`Validator for bigint type not implemented ${v}`);
        },
    },
    symbol: {
        validator: (v: unknown) => {
            throw new Error(`Validator for symbol type not implemented ${v}`);
        },
    },
};
