export default (v: unknown): boolean =>
    v !== undefined && (v === true || v === false);
