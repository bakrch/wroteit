import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { TextArea, Grid, Form, Button, Header, Container } from 'semantic-ui-react';

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


                        <Container>
                            <Header
                                as='h2'
                                content='Start a new book !'
                                style={{ fontSize: '1.7em', fontWeight: 'normal' }} />
                            <Form>
                                <Form.Field>
                                    <Form.Input label='Title' type='text' />
                                </Form.Field>

                                <Form.Field>
                                    <label>Description</label>
                                    <TextArea />
                                </Form.Field>
                                <Form.Field>
                                    <label>Genre</label>

                                    <Form.Select options={[
                                        {
                                            text: 'Sci-fi',
                                            value: 'Sci-fi'
                                        },{
                                            text: 'Thriller',
                                            value: 'Thriller'
                                        },{
                                            text: 'Detective',
                                            value: 'Detective'
                                        }]} />
                                </Form.Field>
                                <Form.Field>
                                    <label>Language</label>

                                    <Form.Select options={[

                                        {
                                            text: 'Français',
                                            value: 'french'
                                        },{
                                            text: 'English',
                                            value: 'english'
                                        },{
                                            text: 'عربي',
                                            value: 'arabic'
                                        }]} />
                                </Form.Field>
                                <Button type='submit'>Submit</Button>
                            </Form>
                        </Container>
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
