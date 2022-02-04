import assertString from "./assertString";

/**
 * Ignores whitespace by default
 */
export default (v: unknown): boolean => {
    assertString(v);
    return (v as string).trim().length === 0;
};
