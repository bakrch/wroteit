import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Divider, Grid, Card, Button, Image, Header } from 'semantic-ui-react';

import Link from 'Client/components/link';
import FixedMenu from 'Home/menu';

const BookCard = () => (

    <Card className='book-card'>
        <Card.Content>
            <Image floated='right' size='small' src='https://marketplace.canva.com/MAB5Wq3gOAs/2/0/thumbnail_large/canva-pink-sunrise-photo-quote-poster-MAB5Wq3gOAs.jpg' />
            <Card.Header
                floated='left'
                style={{
                    paddingTop: '30%'
                }}>
                Go into the light</Card.Header>
            <Card.Meta>By fakedeep author</Card.Meta>
            <Card.Description textAlign='center'>
                ``A must read in sci-fi``
            </Card.Description>
        </Card.Content>
        <Card.Content extra>
            <div className='ui two buttons'>
                <Button basic color='yellow'>
                    Start reading
                </Button>
            </div>
        </Card.Content>
    </Card>
);

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
                <Grid container >
                    <Header
                        style={{
                            color: 'white'
                        }}
                        floated='left'
                        textAlign='left'
                        size='huge'
                        dividing>

                        New entries
                    </Header>
                    <Grid.Row columns={3}>
                        <Grid.Column >
                            <BookCard />
                        </Grid.Column>

                        <Grid.Column >
                            <BookCard />
                        </Grid.Column>

                        <Grid.Column >
                            <BookCard />
                        </Grid.Column>

                    </Grid.Row>

                    <Header
                        style={{
                            color: 'white'
                        }}
                        floated='left'
                        textAlign='left'
                        size='huge'
                        dividing>

                        Best rated
                    </Header>
                    <Grid.Row columns={3}>
                        <Grid.Column >
                            <BookCard />
                        </Grid.Column>

                        <Grid.Column >
                            <BookCard />
                        </Grid.Column>

                        <Grid.Column >
                            <BookCard />
                        </Grid.Column>

                    </Grid.Row>
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
