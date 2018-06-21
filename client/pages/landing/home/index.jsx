import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid, Segment, Button, Header } from 'semantic-ui-react';

import Link from 'Client/components/link';
import FixedMenu from 'Landing/menu';


class HomePage extends Component {
    static propTypes = {
        location: PropTypes.string
    }
    render() {

        return (
            <Container>
                <FixedMenu location={this.props.location} />
                <Helmet>
                    <title>Wroteit</title>
                </Helmet>
                <Grid verticalAlign='middle' centered>
                    <Grid.Column>
                        <Segment
                            textAlign='center'
                            style={{ minHeight: 700, padding: '1em 0em' }}
                            vertical
                        >
                            <Header
                                as='h1'
                                content='WROTEIT'
                                style={{
                                    fontSize: '4em',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    marginBottom: 0,
                                    marginTop: '3em'
                                }}
                            />
                            <Header
                                as='h2'
                                content='Share your writing prompts..'
                                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                            />
                            <Button
                                primary
                                size='huge'
                                as={Link}
                                to='login'>
                              Log in
                            </Button>

                        </Segment>
                    </Grid.Column>
                </Grid>
            </Container>

        );
    }
}

const mapStateToProps = (state, ownProps) => { // @TODO

    return {
        location: ownProps.location.pathname
    };
};

export default connect(mapStateToProps)(HomePage);
