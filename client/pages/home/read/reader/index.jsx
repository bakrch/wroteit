import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Container, Grid, Segment, Button, Header } from 'semantic-ui-react';

import { BookRequest, GetBookID } from './duck';

import FixedMenu from 'Home/menu';


class HomePage extends Component {
    static propTypes = {
        location: PropTypes.string,
        error: PropTypes.string,
        book_id: PropTypes.string,
        success: PropTypes.bool,
        loading: PropTypes.bool,
        data: PropTypes.object,
        getBookId: PropTypes.func,
        getBook: PropTypes.func
    }
    constructor(props){

        super(props);

        if (props.location) {
            props.getBookId(props.location);
        }
        if (props.book_id){
            props.getBook(props.book_id);
        }
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
                            {this.props.data && this.props.data.content &&
                                <div id='reader' dangerouslySetInnerHTML={{ __html: this.props.data.content.html }} />
                            }
                        </Segment>
                    </Grid.Column>
                </Grid>
            </div>

        );
    }
}

const mapStateToProps = (state, ownProps) => { // @TODO

    return {
        location: ownProps.location.pathname,
        book_id: ownProps.location.pathname.split('/').slice(-1)[0],
        data: state.ReaderReducer.response
    };
};
const mapDispatchToProps = (dispatch) => {

    return {
        getBookId: (location) => dispatch(GetBookID(location)),
        getBook: (bookId) => dispatch(BookRequest(bookId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);
