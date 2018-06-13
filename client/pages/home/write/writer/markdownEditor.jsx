import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Button, Container } from 'semantic-ui-react';

import ReactMde, { ReactMdeTypes } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

import Showdown from 'showdown';
class MDEditor extends Component {

    static propTypes = {
        location: PropTypes.string
    }
    constructor(props){

        super(props);
        this.reference = React.createRef();
        this.converter = new Showdown.Converter(
            { tables: true,
                simplifiedAutoLink: true,
                strikethrough: true,
                tasklists: true,
                emoji: true
            });
        this.converter.setFlavor('github');
        this.state = {
            mdeState: null
        };
    }
    handleValueChange = (mdeState) => {

        console.log(this.state.mdeState);
        this.setState({ mdeState });
    }
    render() {

        return (
            <Form >
                <Container >
                    <ReactMde
                        onChange={this.handleValueChange}
                        editorState={this.state.mdeState}
                        layout='vertical'
                        generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
                    />
                </Container>
                <input type='hidden' value={this.state.mdeState === null ? '' : this.state.mdeState.markdown} />
            </Form>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // @TODO

    return {
    };
};

export default connect(mapStateToProps)(MDEditor);
