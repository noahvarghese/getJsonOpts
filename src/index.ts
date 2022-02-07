import isBoolean from "./lib/isBoolean";
import isEmpty from "./lib/isEmpty";
import isNumber from "./lib/isNumber";
import isObj from "./lib/isObj";
import isString from "./lib/isString";
import notImplemented from "./lib/notImplemented";

export type ValidatorMap<T extends string> = {
    [x in T]: (v?: unknown) => boolean;
};

export type TypeKey =
    | "string"
    | "number"
    | "undefined"
    | "boolean"
    | "object"
    | "function"
    | "bigint"
    | "symbol";

export type TypeMap = ValidatorMap<TypeKey>;

export type Expected<T extends string> = {
    [x: string]: {
        required: boolean;
        value: unknown;
        format?: T;
    };
};

export const typeValidators: TypeMap = {
    string: (v: unknown) => isString(v) && !isEmpty(v as string),
    number: isNumber,
    undefined: () => false,
    boolean: isBoolean,
    object: isObj,
    function: notImplemented,
    bigint: notImplemented,
    symbol: notImplemented,
};
