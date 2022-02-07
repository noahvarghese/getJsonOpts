import Logs from "@noahvarghese/logger";
import isBoolean from "./lib/isBoolean";
import isEmpty from "./lib/isEmpty";
import isNumber from "./lib/isNumber";
import isObj from "./lib/isObj";
import isString from "./lib/isString";
import isUndefined from "./lib/isUndefined";
import notImplemented from "./lib/notImplemented";

/**
 * T is a union of strings
 */
export type ValidatorMap<T extends string> = {
    [x in T]: (v?: unknown) => boolean;
};

const types = [
    "string",
    "number",
    "undefined",
    "boolean",
    "object",
    "function",
    "bigint",
    "symbol",
] as const;

export type TypeKey = typeof types[number];

export type TypeMap = ValidatorMap<TypeKey>;

/**
 * T is a union of strings
 */
export type Expected<T extends string> = {
    [x: string]: {
        required: boolean;
        type: TypeKey;
        format?: T;
    };
};

/**
 * List of supported types and their validators
 */
export const typeValidators: TypeMap = {
    string: (v: unknown) => isString(v) && !isEmpty(v as string),
    number: isNumber,
    undefined: isUndefined,
    boolean: isBoolean,
    object: isObj,
    function: notImplemented,
    bigint: notImplemented,
    symbol: notImplemented,
};

/**
 * T represents a union of strings
 */
export default <T extends string, X extends { [x in T]: unknown }>(
    data: Record<string, unknown>,
    options: Expected<T>,
    formatOptions?: ValidatorMap<T>
): X => {
    if (formatOptions) throw new Error("format options not implemented");

    // create return object
    const returnObj: X = {} as X;

    // Loop over keys of options
    for (const [key, value] of Object.entries(options)) {
        // check that type is valid
        if (!types.includes(value.type))
            throw new Error(`type ${value.type} not found`);

        if (value.format) throw new Error("format checker not implemented");

        const validator = typeValidators[value.type];

        try {
            // check if key exists in data
            if (validator(data[key])) {
                // if key exists add data to return object
                returnObj[key as T] = data[key] as X[T];
            } else {
                // else if value is required by options throw key does not exist in data error
                if (value.required)
                    throw new Error(`Key ${key} doest not exist in data`);
            }
        } catch (_e) {
            const { message } = _e as Error;
            if (value.required) throw new Error(`${key} -> ${message}`);
            else Logs.Error(message);
        }
    }

    return returnObj;
};
