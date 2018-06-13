import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid, Segment, Button, Header, Card } from 'semantic-ui-react';

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
                <Grid  centered>
                    <Grid.Column>
                        <Segment
                            textAlign='center'
                            style={{ minHeight: 700, padding: '1em 0em' }}
                            vertical
                        >
                            <Header
                                as='h1'
                                content='Currently on your writing list'
                                style={{
                                    fontSize: '4em',
                                    fontWeight: 'bold',
                                    color: 'white',
                                    marginBottom: 0,
                                    marginTop: '3em'
                                }} />
                            <Container>
                                <Card.Group centered>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>Steve Sanders</Card.Header>
                                            <Card.Meta>Friends of Elliot</Card.Meta>
                                            <Card.Description>
                                                Steve wants to add you to the group <strong>best friends</strong>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button basic color='grey' as={Link} to='/home/write/writer/1'>
                                            Continue
                                            </Button>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>Molly Thomas</Card.Header>
                                            <Card.Meta>New User</Card.Meta>
                                            <Card.Description>
                                                Molly wants to add you to the group <strong>musicians</strong>
                                            </Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button basic color='grey' as={Link} to='/home/write/writer/2' >
                                            Continue
                                            </Button>
                                        </Card.Content>
                                    </Card>
                                    <Card>
                                        <Card.Content>
                                            <Card.Header>Jenny Lawrence</Card.Header>
                                            <Card.Meta>New User</Card.Meta>
                                            <Card.Description>Jenny requested permission to view your contact details</Card.Description>
                                        </Card.Content>
                                        <Card.Content extra>
                                            <Button basic color='grey' as={Link} to='/home/write/writer/3' >
                                            Continue
                                            </Button>
                                        </Card.Content>
                                    </Card>
                                </Card.Group>
                            </Container>

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
