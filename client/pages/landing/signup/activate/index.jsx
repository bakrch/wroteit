import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ActivateRequest } from './duck';
import { Container, Grid, Segment, Message, Header, Icon, Divider } from 'semantic-ui-react';
import { Helmet } from 'react-helmet';

import Link from 'Client/components/link';
import FixedMenu from 'Landing/menu';


class ActivatePage extends Component {
  static propTypes = {
      data: PropTypes.object,
      activate: PropTypes.func,
      email: PropTypes.string,
      token: PropTypes.string,
      location: PropTypes.string
  }


  constructor(props){

      super(props);
      props.activate({
          email : props.email,
          key : props.token
      });
  }

  render() {

      const { data :{ success, loading, error }, location } = this.props;
      return (
          <section className="signup-activate">
              <FixedMenu location={location} />
              <Helmet>
                  <title>Activation</title>
              </Helmet>
              <Container>
                  <Grid verticalAlign='middle' centered>
                      <Grid.Column width='9'>
                          <Segment loading={ loading } textAlign='center'>

                              {!!error && (
                                  <div>
                                      <Header as='h1' icon >
                                          <Icon name='bug' />
                                                  Activation failed
                                          <Divider horizontal />
                                          <Header.Subheader>
                                                  Oups.. Something went wrong..
                                          </Header.Subheader>
                                      </Header>
                                      <Message>
                                      Why don&#39;t you go back <Link to='/'>home?</Link>
                                      </Message>
                                  </div>
                              )}

                              {!!success && (
                                  <Header as='h1' icon >
                                      <Icon name='checkmark' />
                                            Activation succeeded !!
                                      <Divider horizontal />
                                      <Header.Subheader>
                                          <Link to='/login'>You can login to your account now !</Link>
                                      </Header.Subheader>


                                  </Header>
                              )}

                          </Segment>
                      </Grid.Column>
                  </Grid>
              </Container>
          </section>
      );
  }
}

const mapStateToProps = (state, ownProps) => { // @TODO

    return {
        data: state.ActivateReducer,
        email: ownProps.match.params.email,
        token: ownProps.match.params.key,
        location: ownProps.location.pathname
    };
};

const mapDispatchToProps = (dispatch) => {

    return {
        activate: (data) => dispatch(ActivateRequest(data))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ActivatePage);
