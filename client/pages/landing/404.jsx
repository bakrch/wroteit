import React, { Component } from 'react';
import { Container, Grid, Card, Message, Header, Icon, Divider } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';
import Link from 'Client/components/link';


class HomePage extends Component {

    render() {

        return (
            <section className="login-index">
                <Helmet>
                    <title>Not Found</title>
                </Helmet>
                <Container>
                    <Grid verticalAlign='middle' centered>
                        <Grid.Column width='9'>
                            <Card fluid>
                                <Card.Content>
                                    <Header as='h1' icon>
                                        <Icon name='warning' />
                                        error 404 : Not found
                                        <Divider horizontal />
                                        <Header.Subheader>
                                        It seems like this page doesn&#39;t exist..
                                        </Header.Subheader>
                                    </Header>
                                </Card.Content>
                            </Card>
                            <Message>
                                Why don&#39;t you go back <Link to='/'>home?</Link>
                            </Message>
                        </Grid.Column>
                    </Grid>
                </Container>
            </section>
        );
    }
}
export default HomePage;
