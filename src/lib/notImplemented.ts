export default (v: unknown) => {
    throw new Error(
        `Validator for ${typeof v} type not implemented ${
            typeof v === "symbol" ? v.description : v
        }`
    );
};
