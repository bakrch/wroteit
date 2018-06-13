import React, { Component } from 'react';
import { Form, Dropdown } from 'semantic-ui-react';
import PropTypes from 'prop-types';

export default class DropdownComponent extends Component {
    static propTypes = {
        as: PropTypes.any,
        input: PropTypes.object,
        range: PropTypes.array,
        meta: PropTypes.object,
        defaultValue: PropTypes.string
    };

    handleChange = (event, { value }) => {

        return this.props.input.onChange(value);
    };

    render() {

        const { input, defaultValue, as: As = Dropdown, ...props } = this.props;
        return (
            <As {...props} onChange={this.handleChange.bind(this)} defaultValue={defaultValue} />
        );
    }
}
