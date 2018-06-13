import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';
import Slider from 'rc-slider';
import PropTypes from 'prop-types';

export default class SliderComponent extends Component {
    static propTypes = {
        as: PropTypes.any,
        input: PropTypes.object,
        range: PropTypes.array,
        meta: PropTypes.object
    };

    handleChange = (value) => {

        return this.props.input.onChange(value);
    };

    render() {

        const { input, as: As = Slider, ...props } = this.props;
        return (
            <Form.Field>
                <As {...props} onChange={this.handleChange.bind(this)} value={input.value} />
            </Form.Field>
        );
    }
}
