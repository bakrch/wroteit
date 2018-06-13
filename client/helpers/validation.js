export const isRequired = (value) => {

    return value ? undefined : 'Required';
};
export const isNumber = (value) => {

    return value && isNaN(Number(value)) ? 'Must be a number' : undefined;
};
export const isEmail = (value) => {

    return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
        ? 'Invalid email address'
        : undefined;
};
export const isPhoneNumber = (value) => {

    return value && !/^[567][0-9]{8}$/.test(value)
        ? 'Invalid phone number'
        : undefined;

};
export const isMin = (min) => {

    return (value) => {

        return value && value.length < min
            ? `Minimum ${min} characters required`
            : undefined;
    };
};
