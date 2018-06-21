import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Divider, Grid, Card, Button, Image, Header } from 'semantic-ui-react';

import { BrowseRequest } from './duck';

import Link from 'Client/components/link';
import FixedMenu from 'Home/menu';

const BookCard = (props) => {

    if (props.data){
        return (
            <Card className='book-card'>
                <Card.Content>
                    <Card.Header
                        floated='left'
                    >
                        {props.data.title}</Card.Header>
                    <Card.Meta>By {props.data.author}</Card.Meta>
                    <Card.Description textAlign='center'>
                        {props.data.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color='grey' as={Link} to={'/home/read/reader/' + props.data._id}>
                            Start reading
                        </Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
    return (<div></div>);
};
BookCard.propTypes = {
    data: PropTypes.object
};
class HomePage extends Component {
    static propTypes = {
        location: PropTypes.string,
        error: PropTypes.string,
        data: PropTypes.array,
        success: PropTypes.bool,
        loading: PropTypes.bool,
        browse: PropTypes.func
    }
    constructor(props){

        super(props);
        this.renderCards = this.renderCards.bind(this);
        props.browse();
    }
    renderCards(books){

        return books.map(
            (book) => {

                return (
                    <Grid.Column key={book._id}>
                        <BookCard data={book}  />
                    </Grid.Column >
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
                        {this.props.data && this.renderCards(this.props.data)}

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
                        {this.props.data && this.renderCards(this.props.data)}

                    </Grid.Row>
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
const mapStateToProps = (state, ownProps) => {

    return {
        location: ownProps.location.pathname,
        response: state.BrowseReducer.response,
        success: state.BrowseReducer.success,
        data: state.BrowseReducer.data
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
