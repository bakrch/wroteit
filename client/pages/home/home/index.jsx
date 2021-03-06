import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid, Segment, Button, Header } from 'semantic-ui-react';

import Link from 'Client/components/link';
import FixedMenu from 'Home/menu';


class HomePage extends Component {
    static propTypes = {
        location: PropTypes.string
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
                        <Segment
                            textAlign='center'
                            style={{ minHeight: 700, padding: '1em 0em' }}
                            vertical
                        >
                            <Header
                                as='h1'
                                content='WRITEIT'
                                style={{
                                    fontSize: '4em',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    marginBottom: 0
                                }}
                            />
                            <Header
                                as='h2'
                                content='Share your writing prompts..'
                                style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                            />

                        </Segment>
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

export default connect(mapStateToProps)(HomePage);
