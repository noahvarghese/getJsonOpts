export default (v: unknown) => {
    if (v === null) return false;
    const res =
        v &&
        Object.keys(v as Record<string, unknown>).length === 0 &&
        Object.getPrototypeOf(v) === Object.prototype;
    return !res;
};
