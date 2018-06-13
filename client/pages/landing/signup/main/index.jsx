import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { Container, Grid, Card, Form, Button, Message, Icon, Divider } from 'semantic-ui-react';

import { SubmitSignupForm, SIGNUP } from './duck';
import Link from 'Client/components/link';
import { isRequired, isEmail, isMin } from 'Client/helpers/validation';
import FormField from 'Client/components/field';
import RadioGroup from 'Client/components/radio-group';
import FixedMenu from 'Landing/menu';

const min6 = isMin(6);
const validate = (values, props) => {

    const errors = {};
    if (values.password !== values.passwordConfirmation) {
        errors.passwordConfirmation = 'Not matching';
    }
    // else if (!values.accountType) {
    //     errors.accountType = 'Required';
    // }
    return errors;
};
let SignupForm = (props) => {

    const { handleSubmit, submitting, submitSucceeded, submitFailed, error, invalid } = props;
    return (
        <Form onSubmit={handleSubmit} loading={submitting} success={!submitting && submitSucceeded} error={!!error}>
            <Message
                success
                header='Account created'
                content="Please check your email to activate your account..."
            />{/* @TODO */}
            <Message
                error
                header='Signup Failed'
                content={error}
            />
            <Field
                name="penName"
                icon='pen'
                iconPosition='left'
                component={FormField}
                as={Form.Input}
                placeholder="Pen name"
                validate={isRequired}
                autoFocus
            />
            <Field
                name="email"
                icon='at'
                iconPosition='left'
                component={FormField}
                as={Form.Input}
                placeholder="Email"
                validate={[isRequired, isEmail]}
            />
            <Field
                name="password"
                icon='lock'
                iconPosition='left'
                type='password'
                component={FormField}
                as={Form.Input}
                placeholder="Password"
                validate={[isRequired, min6]}
            />
            <Field
                name="passwordConfirmation"
                icon='lock'
                iconPosition='left'
                type='password'
                component={FormField}
                as={Form.Input}
                placeholder="Password confirmation"
                validate={isRequired}
            />
            <Button type='submit' fluid content='Signup' color='teal' icon='unlock alternate' disabled={!submitFailed && invalid} />
        </Form>
    );
};

SignupForm.propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.any
};

SignupForm = reduxForm({
    form: SIGNUP.FORM,
    validate
})(SignupForm);


class SignupPage extends Component {
    static propTypes = {
        data: PropTypes.object,
        login: PropTypes.func,
        restart: PropTypes.func,
        location: PropTypes.string
    }

    constructor(props) {

        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {

        this.props.login({
            email: values.email,
            password: values.password,
            penName: values.penName
        });
    }

    render() {

        return (
            <section className="signup-index">
                <FixedMenu location={this.props.location} />
                <Helmet>
                    <title>Liberium - Sign in</title>
                </Helmet>
                <Container>
                    <Grid verticalAlign='middle' centered>
                        <Grid.Column width='9'>
                            <Card fluid>
                                <Card.Content>
                                    <Card.Header as='h1'>
                                        Signup
                                    </Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <SignupForm onSubmit={this.handleSubmit} />
                                    <Divider horizontal>Or</Divider>
                                    <Button.Group fluid>
                                        <Button as='a' href='/login/facebook' color='facebook'>
                                            <Icon name='facebook' /> Signup with Facebook
                                        </Button>
                                        <Button as='a' href='/login/google' color='google plus'>
                                            <Icon name='google' /> Signup with Google
                                        </Button>
                                    </Button.Group>
                                </Card.Content>
                            </Card>
                            <Message>
                                Vous avez déjà un compte? <Link to='/login'>Se connecter</Link>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </Container>
            </section>
        );
    }
}

const mapStateToProps = (state, ownProps) => { // @TODO

    return {
        location: ownProps.location.pathname
        // data: state.SignupReducer
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        login: (data) => dispatch(SubmitSignupForm(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupPage);
