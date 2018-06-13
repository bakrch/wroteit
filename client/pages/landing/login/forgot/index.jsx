import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { Container, Grid, Card, Form, Button, Message } from 'semantic-ui-react';

import { SubmitForgotForm, FORGOT } from './duck';
import { isRequired, isEmail } from 'Client/helpers/validation';
import FormField from 'Client/components/field';
import FixedMenu from 'Landing/menu';


let ForgotForm = (props) => {

    const { handleSubmit, submitting, submitSucceeded, submitFailed, error, invalid } = props;
    return (
        <Form onSubmit={handleSubmit} loading={submitting} success={!submitting && submitSucceeded} error={!!error}>
            <Message
                success
                header='Success'
                content="Please check your email..."
            />{/* @TODO */}
            <Message
                error
                header='Logging Failed'
                content={error}
            />
            <Field
                name="email"
                icon='at'
                iconPosition='left'
                component={FormField}
                as={Form.Input}
                placeholder="Email"
                validate={[isRequired, isEmail]}
                autoFocus
            />
            <Button type='submit' fluid content='Envoyer demande' color='teal' icon='' disabled={!submitFailed && invalid} />
        </Form>
    );
};

ForgotForm.propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.any,
    location: PropTypes.string
};

ForgotForm = reduxForm({
    form: FORGOT.FORM
})(ForgotForm);


class ForgotPage extends Component {
    static propTypes = {
        data: PropTypes.object,
        forgot: PropTypes.func,
        location: PropTypes.string
    }

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {

        this.props.forgot({
            email: values.email
        });
    }

    render() {

        return (
            <section className="login-forgot">
                <FixedMenu location={this.props.location} />
                <Helmet>
                    <title>Liberium - Forgot password</title>
                </Helmet>
                <Container>
                    <Grid verticalAlign='middle' centered>
                        <Grid.Column width='9'>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header as='h1'>
                                        Login
                                    </Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <ForgotForm onSubmit={this.handleSubmit} data={this.props.data} />
                                </Card.Content>
                            </Card>
                        </Grid.Column>
                    </Grid>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // @TODO

    return {
        data: state.ForgotReducer,
        location: ownProps.location.pathname
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        forgot: (data) => dispatch(SubmitForgotForm(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPage);
