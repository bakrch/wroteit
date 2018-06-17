import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid, Segment, Button, Header, Card } from 'semantic-ui-react';

import { MybooksRequest } from './duck';

import Link from 'Client/components/link';
import FixedMenu from 'Home/menu';

const BookCard = (props) => {

    if (props.data){

        return (
            <Card>
                <Card.Content>
                    <Card.Header>{props.data.title}</Card.Header>
                    <Card.Meta>{props.data.author}</Card.Meta>
                    <Card.Description>
                        {props.data.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='grey' as={Link} to={'/home/write/writer/' + props.data._id}>
        Continue writing
                    </Button>
                </Card.Content>
            </Card>
        );
    }
    return (<div>loading..</div>);
};

BookCard.propTypes = {
    data: PropTypes.object
};
class HomePage extends Component {
    static propTypes = {
        location: PropTypes.string,
        getBooks: PropTypes.func,
        error: PropTypes.string,
        data: PropTypes.array,
        success: PropTypes.bool,
        loading: PropTypes.bool
    }
    constructor(props){

        super(props);
        this.renderCards = this.renderCards.bind(this);
        props.getBooks();
    }
    renderCards(books){

        return books.map(
            (book) => {

                return (
                    <BookCard data={book} key={book._id} />
                );
            }

        );
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
                                    marginTop: '1.2em'
                                }} />
                            <Container>
                                <Card.Group centered>
                                    {this.props.data && this.renderCards(this.props.data)}
                                </Card.Group>
                            </Container>

                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}
const mapDispatchToProps = (dispatch) => {

    return {
        getBooks: () => dispatch(MybooksRequest())
    };
};
const mapStateToProps = (state, ownProps) => { // @TODO

    return {
        location: ownProps.location.pathname,
        response: state.MybooksReducer.response,
        success: state.MybooksReducer.success,
        data: state.MybooksReducer.data
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
