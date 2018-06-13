import React from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const RadioGroup = ({ input, meta: { touched, error }, label, values, name, ...props }) => {

    return (
        <Form.Group
            {...props}
        >
            {!!label && <label>{label}</label>}
            {values.map((v, i) => {

                return <Form.Radio
                    error={!!error}
                    label={v.label}
                    value={v.value}
                    name={name}
                    checked={input.value === v.value}
                    onClick={(event, { value }) => input.onChange(value)}
                    key={i}
                />;
            })}
        </Form.Group>
    );
};
RadioGroup.propTypes  = {
    input: PropTypes.object,
    name: PropTypes.string,
    meta: PropTypes.object,
    values: PropTypes.array,
    label: PropTypes.string
};
export default RadioGroup;
