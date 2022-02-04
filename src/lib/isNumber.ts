export default (v: unknown): boolean => {
    return !isNaN(Number(v || ""));
};
