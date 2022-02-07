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
export type Expected<T extends string = never> = {
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
 * T is a Union of strings which can be inferred by usage, it is the possible keys that could be found in the data
 * X is inferred by usage
 * @param data JSON to parse
 * @param options data structure that contains type checking options
 * @param formatOptions extra formatting checkers that can be applied
 * @returns
 */
const getJOpts = <T extends string, X extends { [x in T]: unknown }>(
    data: Record<string, unknown>,
    options: Expected<T>,
    formatOptions?: ValidatorMap<T>
): X => {
    const returnObj: X = {} as X;

    for (const [key, value] of Object.entries(options)) {
        if (!typeValidators[value.type])
            throw new Error(`type ${value.type} not found`);

        if (
            (value.format && formatOptions && !formatOptions[value.format]) ||
            (value.format && !formatOptions)
        )
            throw new Error(`${value.format} format checker not implemented`);

        const validator = typeValidators[value.type];

        try {
            if (validator(data[key])) {
                if (value.format && formatOptions) {
                    const formatValidator = formatOptions[value.format];
                    if (!formatValidator(data[key]))
                        throw new Error(`format invalid -> ${data[key]}`);
                }

                // if key exists add data to return object
                returnObj[key as T] = data[key] as X[T];
            } else {
                // else if value is required by options throw key does not exist in data error
                if (value.required) throw new Error("does not exist in data");
            }
        } catch (_e) {
            const { message } = _e as Error;

            if (value.required || (value.format && formatOptions))
                throw new Error(`${key} ${message}`);
            else Logs.Error(key, message);
        }
    }

    return returnObj;
};

export default getJOpts;
