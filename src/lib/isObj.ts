import isNumber from "./isNumber";
import isString from "./isString";

export default (v: unknown) => {
    if (!v || isNumber(v) || isString(v) || typeof v === "symbol") return false;

    const res =
        v &&
        Object.keys(v as Record<string, unknown>).length === 0 &&
        Object.getPrototypeOf(v) === Object.prototype &&
        (v as Record<string, unknown>).constructor !== Object;

    return !res;
};
