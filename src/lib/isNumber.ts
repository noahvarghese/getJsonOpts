import isBoolean from "./isBoolean";
import isString from "./isString";

export default (v: unknown): boolean => {
    return (
        typeof v !== "symbol" &&
        v !== null &&
        !isString(v) &&
        !isBoolean(v) &&
        !isNaN(Number(v))
    );
};
