import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';

import { Container, Grid, Card, Form, Button, Message } from 'semantic-ui-react';

import { SubmitResetForm, RESET } from './duck';
import Link from 'Client/components/link';
import { isRequired, isMin } from 'Client/helpers/validation';
import FormField from 'Client/components/field';
import FixedMenu from 'Landing/menu';

const min6 = isMin(6);
const validate = (values, props) => {

    if (values.password !== values.passwordConfirmation) {
        return { passwordConfirmation: 'Not matching' };
    }
};
let ResetForm = (props) => {

    const { handleSubmit, submitting, submitSucceeded, submitFailed, error, invalid } = props;
    return (
        <Form onSubmit={handleSubmit} loading={submitting} success={!submitting && submitSucceeded} error={!!error}>
            <Message
                success
                header='Success!'
                content="Please log in with your new password..."
            />{/* @TODO */}
            <Message
                error
                header='Reset Failed'
                content={error}
            />
            <Field
                name="password"
                icon='lock'
                iconPosition='left'
                type="password"
                component={FormField}
                as={Form.Input}
                placeholder="New Password"
                validate={[isRequired, min6]}
                autoFocus
            />
            <Field
                name="passwordConfirmation"
                icon='lock'
                iconPosition='left'
                type="password"
                component={FormField}
                as={Form.Input}
                placeholder="Confirm Password"
                validate={isRequired}
            />
            <Button type='submit' fluid content='Reset' color='teal' icon='unlock alternate' disabled={!submitFailed && invalid} />
        </Form>
    );
};

ResetForm.propTypes = {
    handleSubmit: PropTypes.func,
    invalid: PropTypes.bool,
    submitting: PropTypes.bool,
    submitSucceeded: PropTypes.bool,
    submitFailed: PropTypes.bool,
    error: PropTypes.any
};

ResetForm = reduxForm({
    form: RESET.FORM,
    validate
})(ResetForm);


class ResetPage extends Component {
    static propTypes = {
        data: PropTypes.object,
        reset: PropTypes.func,
        restart: PropTypes.func,
        token: PropTypes.string,
        email: PropTypes.string,
        location: PropTypes.string
    }

    constructor(props) {

        super(props);

        this.input = {};
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(values) {

        this.props.reset({
            email: this.props.email,
            key: this.props.token,
            password: values.password
        });
    }

    render() {

        return (
            <section className="login-reset">
                <FixedMenu location={this.props.location} />
                <Helmet>
                    <title>Liberium - Password Reset</title>
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
                                    <ResetForm onSubmit={this.handleSubmit} />
                                </Card.Content>
                            </Card>
                            <Message>
                                <Link to='/login'>Back to Login page</Link>
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
        email: ownProps.match.params.email,
        token: ownProps.match.params.key,
        location: ownProps.location.pathname
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        reset: (data) => dispatch(SubmitResetForm(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPage);
