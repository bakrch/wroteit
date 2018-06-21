import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid, Segment, Button, Header } from 'semantic-ui-react';

import { BrowseRequest } from './duck';

import Link from 'Client/components/link';
import FixedMenu from 'Home/menu';


class HomePage extends Component {
    static propTypes = {
        location: PropTypes.string,
        error: PropTypes.string,
        response: PropTypes.string,
        success: PropTypes.bool,
        loading: PropTypes.bool,
        data: PropTypes.object,
        browse: PropTypes.func
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

                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        browse: () => dispatch(BrowseRequest())
    };
};
const mapStateToProps = (state, ownProps) => { // @TODO

    return {
        location: ownProps.location.pathname
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);