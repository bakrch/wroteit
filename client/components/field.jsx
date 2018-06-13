import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class Field extends Component {
    static propTypes = {
        as: PropTypes.any,
        input: PropTypes.object,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        meta: PropTypes.object
    };

    handleChange = (event, { value }) => {

        return this.props.input.onChange(value);
    };

    render() {

        const { input, type, meta: { touched, error }, placeholder, as: As = Form.Input, ...props } = this.props;

        return (
            <Form.Field>
                <As {...props} {...input} value={input.value} type={type} placeholder={placeholder} onChange={this.handleChange.bind(this)} error={touched && !!error} />
            </Form.Field>
        );
    }
}
