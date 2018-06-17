import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Form, Header, Container, Button, Input } from 'semantic-ui-react';

import ReactMde, { ReactMdeTypes } from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';

import { SaveBookRequest, SAVEBOOK, GetBookID, GetBookRequest, InputChange } from './duck';

import { Field, reduxForm } from 'redux-form';
import FormField from 'Client/components/field';

import Showdown from 'showdown';


class MDEditor extends Component {

    static propTypes = {
        location: PropTypes.string,
        book_id: PropTypes.string,
        handleInputChange: PropTypes.func,
        getBookId: PropTypes.func,
        getBook: PropTypes.func,
        save: PropTypes.func,
        inputState: PropTypes.object,
        data: PropTypes.object,
        handleSubmit: PropTypes.func,
        invalid: PropTypes.bool,
        submitting: PropTypes.bool,
        submitSucceeded: PropTypes.bool,
        submitFailed: PropTypes.bool,
        error: PropTypes.any
    }
    constructor(props){

        super(props);
        this.handleValueChange = this.handleValueChange.bind(this);
        this.handleSaveButton = this.handleSaveButton.bind(this);
        this.converter = new Showdown.Converter(
            {
                tables: true,
                simplifiedAutoLink: true,
                strikethrough: true,
                tasklists: true,
                emoji: true
            });
        this.converter.setFlavor('github');
        if (props.location) {
            props.getBookId(props.location);
        }
        if (props.book_id){
            props.getBook(props.book_id);
        }
    }
    handleValueChange(mdeState) {

        this.props.handleInputChange(mdeState);
    }
    handleSaveButton() {

        if (this.props.book_id){
            this.props.save({
                bookId: this.props.book_id,
                content: {
                    html: this.props.inputState.html,
                    markdown: this.props.inputState.markdown
                }
            });
        }
    }
    render() {

        return (
            <Container >
                {
                    this.props.data &&
                    <Header
                        as='h1'
                        content={this.props.data.title}
                        style={{
                            fontSize: '4em',
                            fontWeight: 'bold',
                            color: 'white',
                            marginBottom: 0
                        }} />
                }
                <Button
                    color='green'
                    floated='right'
                    onClick={this.handleSaveButton}
                >Save</Button>
                <ReactMde
                    onChange={this.handleValueChange}
                    editorState={this.props.inputState}
                    layout='vertical'
                    generateMarkdownPreview={(markdown) => Promise.resolve(this.converter.makeHtml(markdown))}
                />

            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // @TODO

    return {
        location: state.routing.location.pathname,
        book_id: state.routing.location.pathname.split('/').slice(-1)[0],
        inputState: state.SaveBookReducer.inputState,
        data: state.SaveBookReducer.response
    };
};
const mapDispatchToProps = (dispatch) => {

    return {
        save: (data) => dispatch(SaveBookRequest(data)),
        handleInputChange: (state) => dispatch(InputChange(state)),
        getBookId: (location) => dispatch(GetBookID(location)),
        getBook: (bookId) => dispatch(GetBookRequest(bookId))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MDEditor);
