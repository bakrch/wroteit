import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid, Message } from 'semantic-ui-react';

import { LogoutRequest } from './duck';
import Link from 'Client/components/link';


class LogoutPage extends Component {
    static propTypes = {
        error: PropTypes.string,
        response: PropTypes.string,
        success: PropTypes.bool,
        loading: PropTypes.bool,
        logout: PropTypes.func
    }

    constructor(props) {

        super(props);

        this.props.logout();
    }

    render() {

        const { error, success, loading } = this.props;

        return (
            <section className="login-logout">
                <Helmet>
                    <title>Liberium - Logout</title>
                </Helmet>
                <Container>
                    <Grid verticalAlign='middle' centered>
                        <Grid.Column width='9'>
                            { loading &&
                                    <Message
                                        header='Logging out'
                                        content='Please wait...'
                                    />
                            }
                            { success &&
                                    <Message
                                        success
                                        header='You were successfully logged out, '
                                        content='Redirecting you to the main page'
                                    />
                            }
                            { !!error &&
                                    <Message negative>
                                        <Message.Header>Error!</Message.Header>
                                        <p>{error} Why don&#39;t you go back <Link to='/'>home</Link>?</p>
                                    </Message>
                            }
                        </Grid.Column>
                    </Grid>
                </Container>
            </section>
        );
    }
}
const mapStateToProps = (state) => { // @TODO

    return {
        error: state.LogoutReducer.error,
        success: state.LogoutReducer.success
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        logout: () => dispatch(LogoutRequest())
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LogoutPage);
