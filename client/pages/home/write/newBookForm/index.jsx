import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TextArea, Grid, Form, Button, Header, Container, Message } from 'semantic-ui-react';

import { SubmitNewbookForm, NEWBOOK } from './duck';
import { Field, reduxForm } from 'redux-form';
import FormField from 'Client/components/field';
import { isRequired } from 'Client/helpers/validation';

import Link from 'Client/components/link';
import FixedMenu from 'Home/menu';

let NewBookForm = (props) => {

    const { handleSubmit, submitting, submitSucceeded, submitFailed, error, invalid } = props;
    return (
        <Form onSubmit={handleSubmit} loading={submitting} success={!submitting && submitSucceeded} error={!!error}>
            <Message
                success
                header='Book created'
                content="You can start writing now"
            />
            <Message
                error
                header='Creation Failed'
                content={error}
            />
            <Field
                name="title"
                icon='book'
                iconPosition='left'
                component={FormField}
                as={Form.Input}
                placeholder="Title"
                validate={isRequired}
                autoFocus
            />
            <Field
                name="description"
                icon='pen'
                iconPosition='left'
                component={FormField}
                as={Form.Input}
                placeholder="Description"
                validate={isRequired}
            />
            <Field
                name="genre"
                component={FormField}
                as={Form.Select}
                placeholder="Genre"
                options={[
                    {
                        text: 'Sci-fi',
                        value: 'Sci-fi'
                    },{
                        text: 'Thriller',
                        value: 'Thriller'
                    },{
                        text: 'Detective',
                        value: 'Detective'
                    }]}
                validate={[isRequired]}
            />
            <Field
                name="language"
                component={FormField}
                as={Form.Select}
                placeholder="Language"
                options={[

                    {
                        text: 'Français',
                        value: 'french'
                    },{
                        text: 'English',
                        value: 'english'
                    },{
                        text: 'عربي',
                        value: 'arabic'
                    }]}
                validate={[isRequired]}
            />
            <Button type='submit' fluid content='Newbook' color='teal' icon='unlock alternate' disabled={!submitFailed && invalid} />
        </Form>
    );
};
NewBookForm.propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.any
};

NewBookForm = reduxForm({
    form: NEWBOOK.FORM
})(NewBookForm);

class HomePage extends Component {
    static propTypes = {
        location: PropTypes.string,
        create: PropTypes.func
    }
    constructor(props) {

        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(values) {

        this.props.create({
            title: values.title,
            description: values.description,
            genre: values.genre,
            language: values.language
        });
    }
    render() {

        return (
            <div>
                <FixedMenu location={this.props.location} />
                <Helmet>
                    <title>Wroteit</title>
                </Helmet>
                <Grid verticalAlign='middle' centered>
                    <Grid.Column>


                        <Container>
                            <Header
                                as='h2'
                                content='Start a new book !'
                                style={{ fontSize: '1.7em', fontWeight: 'normal' }} />

                            <NewBookForm onSubmit={this.handleSubmit} />
                        </Container>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => { // @TODO

    return {
        location: ownProps.location.pathname
    };
};
const mapDispatchToProps = (dispatch) => {

    return {
        create: (data) => dispatch(SubmitNewbookForm(data))
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
