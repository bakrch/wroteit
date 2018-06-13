/* incomplete */
import React, { Component } from 'react';
import _ from 'lodash';
import { Form, Search, Label } from 'semantic-ui-react';
import PropTypes from 'prop-types';


const resultRenderer = ({ title }) => {

    console.log(title);
    return <Label content={title} />;
};

export default class SearchComponent extends Component {
    static propTypes = {
        as: PropTypes.any,
        input: PropTypes.object,
        range: PropTypes.array,
        meta: PropTypes.object,
        data: PropTypes.array.isRequired
    };

    constructor(props) {

        super(props);

        this.state = { results: [], value: '' };

        this.handleResultSelect = this.handleResultSelect.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    handleResultSelect(event, { value }) {

        return this.props.input.onChange(value);
    }

    handleSearchChange(event, { value, data }) {

        this.setState({ value });
        // if (this.state.value.length < 1) {
        //     return this.resetComponent();
        // }

        const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
        const isMatch = (result) => re.test(result.title);

        this.setState({ results: _.filter(data, isMatch) });
        console.log(this.state.results);
        // console.log();
    }

    render() {

        const { input, as: As = Search, ...props } = this.props;
        return (
            <Form.Field>
                <As {...props} onResultSelect={this.handleResultSelect} onSearchChange={this.handleSearchChange} resultRenderer={resultRenderer} results={this.state.results} value={input.value} />
            </Form.Field>
        );
    }
}
