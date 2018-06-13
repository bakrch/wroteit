import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { Container, Grid, Card, Form, Button, Message, Icon, Divider } from 'semantic-ui-react';

import { SubmitLoginForm, LOGIN } from './duck';
import Link from 'Client/components/link';
import { isRequired, isEmail, isMin } from 'Client/helpers/validation';
import FormField from 'Client/components/field';
import FixedMenu from 'Landing/menu';

const min6 = isMin(6);
let LoginForm = (props) => {

    const { handleSubmit, submitting, submitSucceeded, submitFailed, error, invalid } = props;
    return (
        <Form onSubmit={handleSubmit} loading={submitting} success={!submitting && submitSucceeded} error={!!error}>
            <Message
                success
                header='Now logged In'
                content="Redirecting..."
            />{/* @TODO */}
            <Message
                error
                header='Login Failed'
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
            <Button type='submit' fluid content='Login' color='teal' icon='unlock alternate' disabled={!submitFailed && invalid} />
        </Form>
    );
};

LoginForm.propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.any
};

LoginForm = reduxForm({
    form: LOGIN.FORM
})(LoginForm);


class LoginPage extends Component {
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
            password: values.password
        });
    }

    render() {

        return (
            <section className="login-index">
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
                                        Login
                                    </Card.Header>
                                </Card.Content>
                                <Card.Content>
                                    <LoginForm onSubmit={this.handleSubmit} />
                                    <Divider horizontal />
                                    <div className='row right floated'>
                                        <Link  to='/login/forgot'>Forgot Your Password?</Link>
                                    </div>
                                    <Divider horizontal clearing />
                                    <Divider horizontal clearing>Or</Divider>
                                    <Button.Group fluid>
                                        <Button as='a' href='/login/facebook' color='facebook'>
                                            <Icon name='facebook' /> Login with Facebook
                                        </Button>
                                        <Button as='a' href='/login/google' color='google plus'>
                                            <Icon name='google' /> Login with Google
                                        </Button>
                                    </Button.Group>
                                </Card.Content>
                            </Card>
                            <Message>
                                New to us? <Link to='/signup'>Register</Link>
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
        // data: state.LoginReducer
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        login: (data) => dispatch(SubmitLoginForm(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginPage);
