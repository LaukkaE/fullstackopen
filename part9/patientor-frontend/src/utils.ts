export const assertNever = (value: never): never => {
    console.log('assertfail', value);
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};
