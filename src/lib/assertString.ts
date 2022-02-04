const isString = (v: unknown): boolean =>
    typeof v === "string" || v instanceof String;

/**
 * Throws error if v is not a string
 */
export default (v: unknown): void => {
    if (isString(v)) return;

    // Get info for error
    let type: string = v === null ? "null" : typeof v;

    if (type !== "null")
        type = type === "object" ? (v as object).constructor.name : type;

    throw new Error(`Expected a string but received: ${type}`);
};
